"use client";

import { addMesageToThread, checkRunStatus, getAssistantResponse, getThread, runAssistant } from "@/app/api/assistant/assistantAPI";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Flex, Input, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { StyledAssistantChatRoom } from "./AssistantChatRoom/StyledAssistantChatRoom";
import { AssistantRequestForm } from "./AssistantRequestForm/AssistantRequestForm";
import useAssistant from "@/hooks/useAssistant";


type Props = {
    assistantId: string;
}

export const AssistantChatRoom2 = ({ assistantId }: Props) => {
    const queryClient = useQueryClient();

    /**
     * assistant들의 list를 불러온다.
     */
    let Assistants: { isSuccess: boolean, results: any[] } | undefined = queryClient.getQueryData(['assistant'])

    /**
     * 
     */
    const { data } = useQuery({ queryKey: ['thread', 'create'], queryFn: getThread })
    const { thread, setThread,
        assistant, setAssistant,
        conversations, setConversations,
        message, setMessage,
        attachedFiles, setAttachedFiles
    } = useAssistant();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    //쓰레드를 생성함
    useEffect(() => {
        if (data && data.isSuccess) {
            console.log(
                { data }
            )
            setThread(data.results.id);
        }
    }, [data])

    useEffect(() => {
        if (Assistants?.isSuccess) {
            setAssistant(Assistants.results.find(v => v.id === assistantId))
        }
    }, [Assistants])

    useEffect(() => {
        console.log(assistant);
    }, [assistant])

    useEffect(() => {
        // if (scrollRef.current) {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
        // }
    }, [conversations])

    useEffect(() => {
        console.log('메시지 변경', message);
    }, [message])

    useEffect(() => {
        console.log({ thread })
    }, [thread])

    useEffect(() => {
        console.log({ attachedFiles })
    }, [attachedFiles])



    // const handleKeydown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    //     if (event.key === 'Enter') {
    //         event.preventDefault();
    //         handleSubmit();
    //     }
    // }


    return (
        <StyledAssistantChatRoom>
            <AssistantRequestForm></AssistantRequestForm>
        </StyledAssistantChatRoom>
    )
}
