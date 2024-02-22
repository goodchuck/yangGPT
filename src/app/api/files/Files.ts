"use server";
import OpenAI from "openai";
import fs from "fs";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// 파일 업로드
export const uploadFileTest = async ({ purpose }: { purpose?: string }) => {
    try {
        if (!purpose) purpose = "fine-tune";
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

// 파일 리스트 확인
export const getListFiles = async ({ purpose }: { purpose?: string }) => {
    try {
        if (!purpose) purpose = "fine-tuning";

        const list = await openai.files.list();
        let files = [];
        for await (const file of list) {
            console.log(file);
            files.push(file);
        }

        return files;
    } catch (e) {
        throw e;
    }
};
