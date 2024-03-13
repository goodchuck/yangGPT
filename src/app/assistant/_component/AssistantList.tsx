"use client";

import { useQuery } from "@tanstack/react-query";
import { getAssistants } from "@/app/api/assistant/assistantAPI";
import { useRouter } from "next/navigation";

export const AssistantList = () => {
    const router = useRouter();
    const { data } = useQuery({ queryKey: ['assistant'], queryFn: getAssistants })
    console.log(data);

    const onDoubleClickEvent = (assistantId: string) => {
        router.push(`assistant/chatting/${assistantId}`)
    }

    return (
        <>
            <p>AssistantList</p>
            {data && data.results?.map((data, i) => (<div key={i} onDoubleClick={() => { onDoubleClickEvent(data.id) }}>
                <p>{data.instructions}</p>
                <p>{data.name}</p>
            </div>))}
        </>
    )
}