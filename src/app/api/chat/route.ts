import { NextResponse } from 'next/server';
import { BotClient } from '../../../../../sdk/index';

// Clara AI - Uses Bothive Platform with Hivelang Bot
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { message } = body;

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        const bothiveUrl = process.env.NEXT_PUBLIC_BOTHIVE_API_URL || 'http://localhost:3000';
        const botId = process.env.NEXT_PUBLIC_BOTHIVE_BOT_ID || 'your-bot-id-here';
        const apiKey = process.env.BOTHIVE_API_KEY || '';

        const client = new BotClient({ botId, apiKey, baseUrl: bothiveUrl });
        const data = await client.chat(message, { userId: 'demo-user' });

        return NextResponse.json({
            response: data.text || 'Bot returned no response',
            success: true,
        });

    } catch (error: any) {
        console.error('Chat Error:', error);
        return NextResponse.json(
            {
                error: error.message || 'Failed to communicate with bot',
                response: `Connection Error: ${error.message}. Make sure Bothive is running at ${process.env.NEXT_PUBLIC_BOTHIVE_API_URL || 'localhost:3000'}.`
            },
            { status: 500 }
        );
    }
}
