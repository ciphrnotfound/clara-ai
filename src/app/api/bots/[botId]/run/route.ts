import { NextRequest, NextResponse } from "next/server";
import { Interpreter } from "hivelang/dist/index";
import fs from "fs";
import path from "path";
import { getAuthenticatedGoogleClient } from "@/lib/integrations/google";

// ═══════════════════════════════════════════════════════════════════════════
// STATEFUL STORAGE (For non-Google items)
// ═══════════════════════════════════════════════════════════════════════════
const MOCK_DB: any = {
    expenses: [],
    habits: [{ name: "Morning Jog", streak: 5 }],
    goals: [{ goal: "Launch Startup", deadline: "2024-12-31", status: "active" }]
};

// ═══════════════════════════════════════════════════════════════════════════
// AUTH-AWARE HTTP TOOL (Real Integrations via Hivelang)
// ═══════════════════════════════════════════════════════════════════════════
function registerSmartTools(interpreter: Interpreter, userId?: string) {

    // --- SMART HTTP (Injects Auth for Known APIs) ---
    interpreter.registerTool("http.get", async (args: any) => {
        let url = args.url;
        let headers: any = {};

        // 1. Google Auth Injection
        if ((url.includes("googleapis.com") || url.includes("api.gmail.com")) && userId) {
            const authClient = await getAuthenticatedGoogleClient(userId);
            if (authClient) {
                const token = await authClient.getAccessToken(); // Ensure fresh token
                if (token.token) {
                    headers["Authorization"] = `Bearer ${token.token}`;
                }
            } else {
                console.warn("HTTP Tool: No Google Auth found for user " + userId);
                return { error: "Login required for this integration." };
            }
        }

        try {
            // Append query params if provided
            if (args.params) {
                const qs = new URLSearchParams(args.params).toString();
                url += (url.includes("?") ? "&" : "?") + qs;
            }

            const res = await fetch(url, { headers });

            if (!res.ok) {
                const errText = await res.text();
                // console.error(`HTTP GET Failed: ${res.status} ${errText}`);
                return { error: `API Error: ${res.status}` };
            }

            return await res.json();
        } catch (e: any) {
            return { error: e.message };
        }
    });

    interpreter.registerTool("http.post", async (args: any) => {
        let url = args.url;
        let headers: any = { "Content-Type": "application/json" };

        if ((url.includes("googleapis.com") || url.includes("api.gmail.com")) && userId) {
            const authClient = await getAuthenticatedGoogleClient(userId);
            if (authClient) {
                const token = await authClient.getAccessToken();
                if (token.token) headers["Authorization"] = `Bearer ${token.token}`;
            }
        }

        try {
            const res = await fetch(url, {
                method: "POST",
                headers,
                body: JSON.stringify(args.data || {})
            });
            if (!res.ok) return { error: `API Error: ${res.status}` };
            return await res.json();
        } catch (e: any) {
            return { error: e.message };
        }
    });


    // --- AI (LLM Mock/Real) ---
    interpreter.registerTool("ai.generate", async (args: any) => {
        // Simple fallback rules for demo speed, or connect to real LLM if keys present
        const prompt = args.prompt.toLowerCase();
        if (prompt.includes("summarize")) return "Based on the emails, you have 2 urgent items regarding the Project Launch.";
        if (prompt.includes("motivate")) return "Keep pushing! You're building something amazing.";
        return "I've processed that for you.";
    });

    // --- DB (Generic) ---
    interpreter.registerTool("db.store", async (args: any) => {
        const collection = args.collection;
        if (!MOCK_DB[collection]) MOCK_DB[collection] = [];
        MOCK_DB[collection].push(args.value);
        return { success: true };
    });

    interpreter.registerTool("db.find", async (args: any) => {
        return MOCK_DB[args.collection] || [];
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// HELPER: READ FILE
// ═══════════════════════════════════════════════════════════════════════════
function readHiveFile(filename: string): string {
    const pathsToCheck = [
        path.join(process.cwd(), "../integrations", filename), // Dev: ../integrations
        path.join(process.cwd(), "public", "integrations", filename), // Prod
        path.join(process.cwd(), "integrations", filename),
        path.join(process.cwd(), "..", filename) // Root fallback
    ];

    for (const p of pathsToCheck) {
        if (fs.existsSync(p)) return fs.readFileSync(p, "utf-8");
    }
    console.warn(`Could not find ${filename}`);
    return "";
}

// ═══════════════════════════════════════════════════════════════════════════
// API HANDLER
// ═══════════════════════════════════════════════════════════════════════════
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ botId: string }> }
) {
    try {
        const { botId } = await params;
        const body = await request.json();
        const { prompt, context, userId } = body;

        // Initialize Interpreter
        const interpreter = new Interpreter();
        registerSmartTools(interpreter, userId || "user_123");

        // 1. REGISTER INTEGRATIONS (Load .hive files)
        // This parses the integration files and registers capabilities as tools
        // e.g. 'gmail.hive' -> registers 'integrations.gmail.list'
        const gmailCode = readHiveFile("gmail.hive");
        if (gmailCode) interpreter.load(gmailCode);

        const calendarCode = readHiveFile("calendar.hive");
        if (calendarCode) interpreter.load(calendarCode);

        // 2. READ MAIN BOT CODE
        let mainCode = "";
        const mainPaths = [
            path.join(process.cwd(), "../clara-ai.hive"),
            path.join(process.cwd(), "clara-ai.hive")
        ];
        for (const p of mainPaths) {
            if (fs.existsSync(p)) { mainCode = fs.readFileSync(p, "utf-8"); break; }
        }

        if (!mainCode) throw new Error("Could not find clara-ai.hive provided");

        // 3. RUN IT
        const result = await interpreter.run(mainCode, prompt, context);
        let responseText = result.output.join("\n");
        if (!responseText) responseText = "(Done)";

        return NextResponse.json({
            success: true,
            response: responseText,
            botId,
            model: "hivelang-embedded-v2-real",
        });

    } catch (error: any) {
        console.error("Runtime Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
