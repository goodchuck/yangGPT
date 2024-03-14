"use client";

import { addMesageToThread, checkRunStatus, getAssistantResponse, getThread, runAssistant } from "@/app/api/assistant/assistantAPI";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import { useEffect, useState } from "react";

type Props = {
    assistantId: string;
}
export const AssistantChatRoom = ({ assistantId }: Props) => {
    const queryClient = useQueryClient();
    let targetAssistant: { isSuccess: boolean, results: any[] } | undefined = queryClient.getQueryData(['assistant'])
    const { data } = useQuery({ queryKey: ['thread', 'create'], queryFn: getThread })
    const [thread, setThread] = useState<string>();
    const [assistant, setAssistant] = useState<any>();
    useEffect(() => {
        if (data && data.isSuccess) {
            console.log(
                { data }
            )
            setThread(data.results.id);
        }
    }, [data])

    useEffect(() => {
        if (targetAssistant?.isSuccess) {
            setAssistant(targetAssistant.results.find(v => v.id === assistantId))
        }
    }, [targetAssistant])

    useEffect(() => {
        console.log(assistant);
    }, [assistant])

    const handleSubmit = async () => {
        console.log("핸들클릭", thread)
        if (thread && assistant) {
            //쓰레드에 메시지 추가
            let aMTTRes = await addMesageToThread({ threadId: thread, content: '면접때 꼭나오는 질문이 뭐가있나요?' })
            console.log({ aMTTRes })
            //assistant에 쓰레드 추가
            let runRes = await runAssistant({ threadId: thread, assistantId, instructions: assistant.instructions })
            console.log({ runRes });
            //assistant의 상태 확인
            let cRSRes = await checkRunStatus({ threadId: thread, runId: runRes.results.id })
            console.log({ cRSRes });
            // await getAssistantResponse(thread);
        }

    }

    const handleSubmit2 = async () => {
        if (thread) {
            // assistant의 대답 확인
            let res = await getAssistantResponse(thread);
            console.log({ res });
        }
    }

    return (
        <>
            <Button onClick={handleSubmit}>제출</Button>
            <Button onClick={handleSubmit2}>메시지 확인</Button>
        </>
    )
}