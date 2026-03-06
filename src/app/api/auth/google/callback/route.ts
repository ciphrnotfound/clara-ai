import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || "http://localhost:3000/api/auth/google/callback";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");

    // Check for errors
    if (error) {
        return NextResponse.redirect(new URL(`/?error=${error}`, req.url));
    }

    if (!code) {
        return NextResponse.redirect(new URL("/?error=no_code", req.url));
    }

    // Validate state
    const storedState = req.cookies.get("oauth_state")?.value;
    if (!storedState || storedState !== state) {
        return NextResponse.redirect(new URL("/?error=invalid_state", req.url));
    }

    try {
        // Exchange code for tokens
        const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                code,
                client_id: GOOGLE_CLIENT_ID,
                client_secret: GOOGLE_CLIENT_SECRET,
                redirect_uri: GOOGLE_REDIRECT_URI,
                grant_type: "authorization_code",
            }),
        });

        const tokens = await tokenResponse.json();

        if (tokens.error) {
            throw new Error(tokens.error_description || tokens.error);
        }

        // Get user info from Google
        const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: { Authorization: `Bearer ${tokens.access_token}` },
        });

        const userInfo = await userInfoResponse.json();

        // Get user_id from session cookie or query param
        // In production, you'd get this from the authenticated session
        const userId = req.cookies.get("user_id")?.value;

        if (!userId) {
            // For now, store in localStorage via redirect
            const successUrl = new URL("/", req.url);
            successUrl.searchParams.set("google_connected", "true");
            successUrl.searchParams.set("email", userInfo.email);
            return NextResponse.redirect(successUrl);
        }

        // Store tokens in database
        const expiresAt = new Date(Date.now() + tokens.expires_in * 1000);

        await supabaseAdmin.from("user_integrations").upsert({
            user_id: userId,
            provider: "google",
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            token_type: tokens.token_type,
            scope: tokens.scope,
            expires_at: expiresAt.toISOString(),
            provider_user_id: userInfo.id,
            provider_email: userInfo.email,
            updated_at: new Date().toISOString(),
        }, {
            onConflict: "user_id,provider",
        });

        // Clear state cookie and redirect
        const response = NextResponse.redirect(new URL("/?google_connected=true", req.url));
        response.cookies.delete("oauth_state");

        return response;
    } catch (error: any) {
        console.error("Google OAuth Error:", error);
        return NextResponse.redirect(new URL(`/?error=${encodeURIComponent(error.message)}`, req.url));
    }
}
