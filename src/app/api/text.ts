"use server";
import { GPTTextRequest } from "@/types/GPT/type";
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
export const getText = async ({ model, messages }: GPTTextRequest) => {
    try {
        // console.log("getText", { model, messages });
        let filteredMessage = messages.map((row) => {
            let { role, content } = row;
            return { role, content };
        });

        const completion = await openai.chat.completions.create({
            //@ts-ignore
            messages: filteredMessage,
            model: model,
        });
        console.log(completion.choices[0]);
        if (completion.choices[0].message.content) {
            return completion.choices[0].message.content;
        } else {
            return false;
        }
    } catch (e) {
        throw e;
    }
};
