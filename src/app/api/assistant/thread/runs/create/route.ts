import { NextResponse } from "next/server";
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
/**
 * @param request
 * @returns
 */
export async function POST(request: Request) {
    try {
        let { threadId, assistantId, instructions } = await request.json();
        const message = await openai.beta.threads.runs.create(threadId, {
            assistant_id: assistantId,
            instructions: instructions,
        });

        const jsonResponse = NextResponse.json(
            { isSuccess: true, results: message },
            { status: 200 }
        );
        // Disable caching
        jsonResponse.headers.set("Cache-Control", "no-store");

        return jsonResponse;
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
