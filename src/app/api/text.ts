"use server";
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
export const getText = async (model: string, message: string) => {
    try {
        // console.log("getText", { model, message });
        const completion = await openai.chat.completions.create({
            messages: [
                // { role: "system", content: "Kakao Friends Assistant Bot." },
                { role: "user", content: message },
            ],
            model: model,
        });
        // console.log(completion.choices[0]);
        if (completion.choices[0].message.content) {
            return completion.choices[0].message.content;
        } else {
            return false;
        }
    } catch (e) {
        throw e;
    }
};
