import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// const speechFile = path.resolve("./speech.mp3");
export async function POST(request: Request) {
    try {
        let { message, voice = "alloy" } = await request.json();
        const mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice: voice,
            input: message,
        });
        // console.log(speechFile);
        const buffer = Buffer.from(await mp3.arrayBuffer());
        const base64Audio = buffer.toString("base64");
        // await fs.promises.writeFile(speechFile, buffer);
        return NextResponse.json(
            { isSuccess: true, message: "성공", audioData: base64Audio },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
