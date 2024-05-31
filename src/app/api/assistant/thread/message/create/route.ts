import { NextResponse } from 'next/server';
import OpenAI from 'openai';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * @param request
 * @returns
 */
export async function POST(request: Request) {
  try {
    let { threadId, content, file_ids } = await request.json();
    console.log({ threadId, content, file_ids });
    const message = await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content,
      file_ids,
    });

    const jsonResponse = NextResponse.json(
      { isSuccess: true, results: message },
      { status: 200 },
    );
    // Disable caching
    jsonResponse.headers.set('Cache-Control', 'no-store');

    return jsonResponse;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
