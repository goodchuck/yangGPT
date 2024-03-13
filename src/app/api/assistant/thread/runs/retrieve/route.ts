import { NextResponse } from "next/server";
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
/**
 * @param request
 * @returns
 */
export async function POST(request: Request) {
    try {
        let { threadId, runId } = await request.json();
        const run = await openai.beta.threads.runs.retrieve(threadId, runId);

        const jsonResponse = NextResponse.json(
            { isSuccess: true, results: run },
            { status: 200 }
        );
        // Disable caching
        jsonResponse.headers.set("Cache-Control", "no-store");

        return jsonResponse;
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
