"use server";
import OpenAI from "openai";
import fs from "fs";
import { Uploadable } from "openai/uploads.mjs";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// 파일 업로드
export const uploadFileTest = async ({
    purpose = "fine-tune",
}: {
    purpose?: "fine-tune" | "assistants";
}) => {
    try {
        const file = await openai.files.create({
            file: fs.createReadStream(
                "./src/app/_database/fineTuningTest.jsonl"
            ),
            purpose,
        });

        console.log(file);
    } catch (e) {
        throw e;
    }
};

// 파일 업로드
export const uploadFileForOpenAI = async ({
    purpose = "fine-tune",
    file,
    formData,
}: {
    purpose?: "fine-tune" | "assistants";
    file?: any;
    formData: FormData;
}) => {
    try {
        let files = formData.get("files[]");
        if (!files) {
            throw "파일이 없습니다";
        }
        console.log("uploadFileForOpenAI", purpose, files, formData);
        // return;
        // file객체 가능
        const openAIFile = await openai.files.create({
            file: Array.isArray(files) ? files[0] : files,
            purpose,
        });

        console.log(openAIFile);
        return openAIFile;
    } catch (e) {
        throw e;
    }
};

// 파일 삭제
export const deleteOpenAIFile = async (fileId: string) => {
    try {
        const file = await openai.files.del(fileId);
        return file;
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
