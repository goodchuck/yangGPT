"use server";
import OpenAI from "openai";
import fs from "fs";

export const uploadFileTest = async () => {
    try {
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        const file = await openai.files.create({
            file: fs.createReadStream(
                "./src/app/_database/fineTuningTest.jsonl"
            ),
            purpose: "fine-tune",
        });

        console.log(file);
    } catch (e) {
        throw e;
    }
};
