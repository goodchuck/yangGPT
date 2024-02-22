"use server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
export const createFineTuningJob = async () => {
    try {
        const fineTune = await openai.fineTuning.jobs.create({
            training_file: "file-abc123",
            model: "gpt-3.5-turbo",
        });

        console.log(fineTune);
    } catch (e) {
        throw e;
    }
};

export const getFineTuningJobsList = async () => {
    const list = await openai.fineTuning.jobs.list();

    const lists = [];
    for await (const fineTune of list) {
        console.log(fineTune);
        lists.push(fineTune);
    }
    return lists;
};
