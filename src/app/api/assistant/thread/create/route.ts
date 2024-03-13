import { NextResponse } from "next/server";
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function GET(request: Request) {
    try {
        const thread = await openai.beta.threads.create();
        return NextResponse.json(
            { isSuccess: true, results: thread },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
