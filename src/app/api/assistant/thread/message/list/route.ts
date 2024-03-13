import { NextResponse } from "next/server";
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * @param request
 * @returns
 */
export async function GET(request: Request) {
    try {
        const threadId = new URL(request.url).searchParams.get("threadId");
        if (!threadId) {
            return NextResponse.json({ error: "실패" }, { status: 500 });
        }
        const message = await openai.beta.threads.messages.list(threadId);

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
