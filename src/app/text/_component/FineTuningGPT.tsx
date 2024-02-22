"use client"
import { getListFiles, uploadFileTest } from "@/app/api/files/Files"
import { getFineTuningJobsList } from "@/app/api/finetuning/finetuning"
import { useState } from "react";
export const FineTuningGPT = () => {
    const [fineTunedJobs, setFineTunedJobs] = useState<any[]>();

    const onClickFineTunedJobs = async () => {
        setFineTunedJobs([]);
        let list = await getFineTuningJobsList();
        if (list) {
            setFineTunedJobs(list);
        }

    }

    return (
        <>
            <button onClick={() => { uploadFileTest({}) }}>학습파일 업로드하기</button>
            <button onClick={() => { onClickFineTunedJobs() }}>학습된 모델들 보기</button>
            {fineTunedJobs?.map((val, i) => (<div key={i}>
                <p>object : {val.object}</p>
                <p>created_at : {val.created_at}</p>

            </div>))}
        </>
    )

}