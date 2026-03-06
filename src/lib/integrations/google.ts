import { google } from "googleapis";
import { supabase } from "@/lib/supabase";

/**
 * Gets an authenticated Google OAuth2 client for a specific user.
 * Fetches tokens from the user_integrations table.
 */
export async function getAuthenticatedGoogleClient(userId: string) {
    try {
        // 1. Fetch Integration Record
        const { data: integration, error } = await supabase
            .from("user_integrations")
            .select("*")
            .eq("user_id", userId)
            .eq("provider", "google")
            .single();

        if (error || !integration) {
            console.warn(`No Google integration found for user ${userId}`);
            return null;
        }

        // 2. Initialize OAuth2 Client
        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URI
        );

        // 3. Set Credentials
        oauth2Client.setCredentials({
            access_token: integration.access_token,
            refresh_token: integration.refresh_token,
            expiry_date: integration.expires_at ? new Date(integration.expires_at).getTime() : undefined,
        });

        // 4. Handle Refresh if needed
        oauth2Client.on("tokens", async (tokens) => {
            if (tokens.refresh_token) {
                // If a new refresh token is issued, store it
                await supabase
                    .from("user_integrations")
                    .update({
                        access_token: tokens.access_token,
                        refresh_token: tokens.refresh_token,
                        expires_at: tokens.expiry_date ? new Date(tokens.expiry_date).toISOString() : null,
                        updated_at: new Date().toISOString(),
                    })
                    .eq("id", integration.id);
            } else {
                // Just update access token
                await supabase
                    .from("user_integrations")
                    .update({
                        access_token: tokens.access_token,
                        expires_at: tokens.expiry_date ? new Date(tokens.expiry_date).toISOString() : null,
                        updated_at: new Date().toISOString(),
                    })
                    .eq("id", integration.id);
            }
        });

        return oauth2Client;
    } catch (err) {
        console.error("Error in getAuthenticatedGoogleClient:", err);
        return null;
    }
}
