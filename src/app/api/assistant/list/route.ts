import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
/**
 * @param request
 * @returns
 */
export async function GET(request: Request) {
    try {
        const userId = new URL(request.url).searchParams.get("userId");
        const assistantList = await openai.beta.assistants.list({
            order: "desc",
            limit: 20,
        });

        const jsonResponse = NextResponse.json(
            { isSuccess: true, results: assistantList.data },
            { status: 200 }
        );
        // Disable caching
        jsonResponse.headers.set("Cache-Control", "no-store");

        return jsonResponse;
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
