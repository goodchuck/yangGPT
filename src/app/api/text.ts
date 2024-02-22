"use server";
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
export const getText = async (message: string) => {
    try {
        // console.log("있어", process.env.OPENAI_API_KEY);

        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "Kakao Friends Assistant Bot." },
                { role: "user", content: message },
            ],
            model: "gpt-3.5-turbo",
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
