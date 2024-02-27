"use server";
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * API에서 사용가능한 모델들을 불러와준다.
 * @returns
 */
export const getModels = async () => {
    const list = await openai.models.list();
    let lists = [];
    for await (const model of list) {
        console.log(model);
        lists.push(model);
    }
    return lists;
};
