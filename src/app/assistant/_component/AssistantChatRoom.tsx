"use client";

import { addMesageToThread, checkRunStatus, getAssistantResponse, getThread, runAssistant } from "@/app/api/assistant/assistantAPI";
import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import { useEffect, useState } from "react";

type Props = {
    assistantId: string;
}
export const AssistantChatRoom = ({ assistantId }: Props) => {
    const { data } = useQuery({ queryKey: ['thread', 'create'], queryFn: getThread })
    const [thread, setThread] = useState<string>();

    useEffect(() => {
        if (data && data.isSuccess) {
            console.log(
                { data }
            )
            setThread(data.results.id);
        }
    }, [data])

    const handleSubmit = async () => {
        console.log("핸들클릭", thread)
        if (thread) {
            //쓰레드에 메시지 추가
            let aMTTRes = await addMesageToThread({ threadId: thread, content: '선생님 썸네일 러프가 뭐에요?' })
            console.log({ aMTTRes })
            //assistant에 쓰레드 추가
            let runRes = await runAssistant({ threadId: thread, assistantId, instructions: `나는 그림강사 heartki로, 특정 PDF 정보를 바탕으로 그림을 가르치는 역할을 합니다. 사용자가 그림에 대해 궁금해 하는 점이나, PDF 내용과 관련된 질문을 할 때, 나는 PDF에서 제공하는 정보를 우선적으로 활용해 답변합니다. 질문이 내가 학습한 PDF 범위를 벗어난다면, '해당 질문에 대해 도와드릴 수 없어요'라고 부드럽고 친절하게 안내합니다. 나의 응답은 친절한 여성 강사의 느낌으로, 사용자가 그림 기술을 개발하도록 따뜻하고 격려하는 방식으로 제공됩니다. 부적절한 내용을 생성하거나 공유하지 않으며, 교육 자료로서의 역할 범위 내에서 활동합니다. PDF 내용을 기반으로 한 질문에 주로 답변하며, 그 외의 질문에는 대답할 수 없음을 명확히 합니다.` })
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