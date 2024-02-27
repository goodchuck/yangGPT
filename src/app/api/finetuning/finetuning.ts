"use server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
/**
 * 파인튜닝 직업 생성
 */
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

/**
 * 파인 튜닝 직업 찾기
 * @returns
 */
export const getFineTuningJobsList = async () => {
    const list = await openai.fineTuning.jobs.list();

    const lists = [];
    for await (const fineTune of list) {
        console.log(fineTune);
        lists.push(fineTune);
    }
    return lists;
};

/**
 * OpenAI 에 API reference에있는데 이제 사라진듯?
 */
export const getFineTuningEventsList = async () => {
    // const list = await openai.fineTuning.list_events(id="ftjob-abc123", limit=2);
    // for await (const fineTune of list) {
    //   console.log(fineTune);
    // }
};

/**
 * 파인튜닝 된 직업을 다시 되찾는(?)
 * @param fine_tuning_job_id
 */
export const retriveFineTuningJob = async (fine_tuning_job_id: string) => {
    if (!fine_tuning_job_id) {
        let message = "fine_tuning_job_id required";
        throw message;
    }
    const fineTune = await openai.fineTuning.jobs.retrieve(fine_tuning_job_id);

    console.log(fineTune);
};

/**
 * 파인 튜닝된걸 즉시 캔슬 시킴
 * @param fine_tuning_job_id
 */
export const cancelFineTuningJob = async (fine_tuning_job_id: string) => {
    if (!fine_tuning_job_id) {
        let message = "fine_tuning_job_id required";
        throw message;
    }
    const fineTune = await openai.fineTuning.jobs.cancel(fine_tuning_job_id);

    console.log(fineTune);
};

/**
 *
 * @param fine_tuning_job_id ex) ft:gpt-3.5-turbo:acemeco:suffix:abc123
 */
export const deleteAFineTunedModel = async (fine_tuning_job_id: string) => {
    if (!fine_tuning_job_id) {
        let message = "fine_tuning_job_id required";
        throw message;
    }

    const model = await openai.models.del(fine_tuning_job_id);

    console.log(model);
};
