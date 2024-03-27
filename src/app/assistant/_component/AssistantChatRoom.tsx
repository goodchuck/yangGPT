"use client";

import { addMesageToThread, checkRunStatus, getAssistantResponse, getThread, runAssistant } from "@/app/api/assistant/assistantAPI";
import { getTTS } from "@/app/api/Text-to-speech/Text-to-speechAPI";
import { StyledConverSationRow } from "@/app/assistant/_component/StyledConverSationRow";
import { PlayCircleOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Flex, Input, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import { StyledAssistantChatRoom } from "./StyledAssistantChatRoom";

type Props = {
    assistantId: string;
}

const { TextArea } = Input;
export const AssistantChatRoom = ({ assistantId }: Props) => {
    const queryClient = useQueryClient();
    let targetAssistant: { isSuccess: boolean, results: any[] } | undefined = queryClient.getQueryData(['assistant'])
    const { data } = useQuery({ queryKey: ['thread', 'create'], queryFn: getThread })

    const [thread, setThread] = useState<string>();
    const [assistant, setAssistant] = useState<any>();
    const [message, setMessage] = useState<string>();
    const [conversations, setConversations] = useState<{ message: string, audioData?: any, isMe?: boolean }[]>([]);
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
        if (targetAssistant?.isSuccess) {
            setAssistant(targetAssistant.results.find(v => v.id === assistantId))
        }
    }, [targetAssistant])

    useEffect(() => {
        console.log(assistant);
    }, [assistant])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [conversations])

    const mutation = useMutation({
        mutationFn: async (message: string) => {
            try {
                if (thread && assistant) {
                    setIsLoading(true);
                    // scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
                    setMessage('');
                    let testRes = await getTTS({ message, voice: 'nova' });
                    setConversations([...conversations, { message, audioData: testRes.audioData, isMe: true }])

                    // scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
                    //쓰레드에 메시지 추가
                    let aMTTRes = await addMesageToThread({ threadId: thread, content: message })
                    console.log({ aMTTRes })

                    //assistant에 쓰레드 추가
                    let runRes = await runAssistant({ threadId: thread, assistantId, instructions: assistant.instructions })
                    console.log({ runRes });
                    // 폴링 로직을 프로미스로 감싸서 반환
                    return new Promise(async (resolve, reject) => {
                        const pollStatus = async () => {
                            try {
                                let cRSRes = await checkRunStatus({ threadId: thread, runId: runRes.results.id });
                                console.log({ cRSRes });

                                if (!cRSRes.isSuccess) {
                                    reject(new Error("Polling failed"));
                                    return;
                                } else if (cRSRes.results.status === 'completed') {
                                    let res = await getAssistantResponse(thread);
                                    console.log({ res });
                                    if (res.isSuccess) {
                                        resolve(res.results.data[0].content[0].text.value); // 성공적으로 완료된 경우
                                    } else {
                                        reject("Failed to get assistant response");
                                    }
                                } else {
                                    setTimeout(pollStatus, 5000); // 계속 폴링
                                }
                            } catch (error) {
                                console.error('Error during polling', error);
                                reject(error); // 폴링 중 에러 발생
                            }
                        };
                        pollStatus();
                    });
                    // return runRes.results.id;

                }
            }
            catch (e) {
                throw e;
            }
        },
        async onSuccess(message: any) {
            if (!thread) return;
            // 폴링 결과에 따라 성공 처리

            let testRes = await getTTS({ message, voice: 'nova' });
            setConversations([...conversations, { message, audioData: testRes.audioData, isMe: false }])
            setIsLoading(false);
            // scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
        },
        async onError() {
            setIsLoading(false);
            // scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    })

    const handleSubmit = async () => {
        console.log("핸들클릭", thread)
        if (message) {
            mutation.mutate(message);
        }


    }

    const onChangeMessageEvent = async (e: any) => {
        console.log(e.target.value)
        setMessage(e.target.value);
    }

    return (
        <StyledAssistantChatRoom>
            <Flex gap={'middle'} style={{ width: '100%' }}>
                <Flex gap={'middle'} vertical style={{ width: '50%' }}>
                    <Flex gap={'middle'} vertical align="center" className="conversationRoom">
                        {conversations.map((row, index) => (<ConverSationRow key={index} message={row.message} audioData={row.audioData} isMe={row.isMe}></ConverSationRow>))}
                        {isLoading && (<Spin></Spin>)}
                        <div ref={scrollRef}></div>
                    </Flex>

                    <TextArea value={message} onChange={onChangeMessageEvent} rows={4}></TextArea>

                    <Flex gap={'middle'}>
                        <Button onClick={handleSubmit}>제출</Button>
                    </Flex>
                </Flex>
                <Flex gap={'middle'} vertical style={{ width: '50%' }}>
                    <h2>인공지능 설명</h2>
                    <p>이름</p>
                    <p>{assistant && assistant.name}</p>
                    <p>모델</p>
                    <p>{assistant && assistant.model}</p>
                    <p>컨셉</p>
                    <p>{assistant && assistant.instructions}</p>
                </Flex>
            </Flex>

        </StyledAssistantChatRoom>
    )
}

const ConverSationRow = ({ message, audioData, isMe = false }: { message: string, audioData?: any, isMe?: boolean }) => {
    // console.log({ message, isMe })
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const onClickEvent = () => {
        if (audioRef.current && audioData) {
            audioRef.current.src = `data:audio/mp3;base64,${audioData}`
            audioRef.current.play();
        }
    }

    return (
        <StyledConverSationRow className={isMe ? 'me' : 'und'}>
            {/* 프로필 영역 */}


            <Flex gap={'middle'}>
                <Flex gap={'middle'} vertical align={'center'} style={{ width: '15%', justifyContent: 'center' }}>
                    <img width={'100px'} height={'100px'} src={isMe ? `/icons/user/ChatGPT_logo.svg` : `/icons/user/웃는표정2.png`}></img>
                    <h3>{isMe ? 'you' : 'assistant'}</h3>
                </Flex>
                <Flex gap={'middle'} style={{ width: '85%', border: '1px solid black' }}>
                    <p style={{ width: '95%' }}>{message}</p>
                    <PlayCircleOutlined onClick={onClickEvent} />
                    <audio ref={audioRef}></audio>
                </Flex>

            </Flex>

        </StyledConverSationRow>
    )
}