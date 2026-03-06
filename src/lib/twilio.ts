
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER; // e.g., 'whatsapp:+14155238886'

// Initialize Twilio client only if credentials exist
const client = (accountSid && authToken) ? twilio(accountSid, authToken) : null;

export async function sendWhatsAppMessage(to: string, body: string) {
    if (!client) {
        console.warn("Twilio credentials missing. Mocking send:", { to, body });
        return { sid: 'mock_sid_' + Date.now() };
    }

    try {
        const message = await client.messages.create({
            body,
            from: fromNumber,
            to: to.startsWith('whatsapp:') ? to : `whatsapp:${to}`
        });
        return message;
    } catch (error) {
        console.error("Error sending WhatsApp message:", error);
        throw error;
    }
}

export async function listWhatsAppMessages(limit: number = 10) {
    if (!client) {
        return [
            { from: 'whatsapp:+1234567890', body: 'Hey Clara, can you check my calendar?', dateSent: new Date() },
            { from: 'whatsapp:+0987654321', body: 'What is the weather like?', dateSent: new Date(Date.now() - 3600000) }
        ];
    }

    try {
        const messages = await client.messages.list({ limit });
        return messages.map(m => ({
            from: m.from,
            body: m.body,
            dateSent: m.dateSent
        }));
    } catch (error) {
        console.error("Error listing WhatsApp messages:", error);
        throw error;
    }
}
