
import { NextRequest, NextResponse } from 'next/server';
import { sendWhatsAppMessage } from '@/lib/twilio';

// This webhook handles incoming messages from Twilio
export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const body = formData.get('Body') as string;
        const from = formData.get('From') as string;

        console.log(`Received WhatsApp message from ${from}: ${body}`);

        // In a real production app, we would:
        // 1. Authenticate the request (validate Twilio signature)
        // 2. Identify the user by phone number
        // 3. Send the message to the HiveLang bot for processing
        // 4. Send the bot's response back to the user

        // For now, we'll do a simple echo/acknowledgment logic
        // or trigger a "Clara is thinking..." response.

        // Example: If message contains "brief me", trigger daily briefing
        if (body.toLowerCase().includes('brief me')) {
            await sendWhatsAppMessage(from, "☀️ Good morning! One moment while I prepare your briefing...");
            // Call bot execution logic here...
        } else {
            await sendWhatsAppMessage(from, "I received your message! Clara is currently offline for upgrades, but I'll get back to you soon. 🧠");
        }

        // TwiML response (optional, but good practice to return 200)
        return new NextResponse('<Response></Response>', {
            headers: { 'Content-Type': 'text/xml' }
        });

    } catch (error) {
        console.error("Error handling WhatsApp webhook:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
