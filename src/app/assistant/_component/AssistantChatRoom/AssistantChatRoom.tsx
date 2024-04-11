"use client";

import { addMesageToThread, checkRunStatus, getAssistantResponse, getThread, runAssistant } from "@/app/api/assistant/assistantAPI";
import { getTTS } from "@/app/api/Text-to-speech/Text-to-speechAPI";
import { StyledConverSationRow } from "@/app/assistant/_component/StyledConverSationRow";
import { PlayCircleOutlined, UpSquareFilled } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Flex, Input, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { StyledAssistantChatRoom } from "./StyledAssistantChatRoom";
import TypingEffect from "@/app/_component/TypingEffectComponent";
import { UploadComponent } from "@/app/_component/UploadComponent";

const pdfIntroduce = `안녕하세요?
PDF 문제 생성기입니다!
해당 모델은 GPT 4를 기반으로 제작되었으며
사용자가 PDF파일을 업로드하면 해당 PDF를 통해 문제를 제작해서
제공해주는 역할을 수행하고있습니다!
아직 테스트를 계속 진행해보고있습니다.
만약 테스트를 해보고싶으시다면 아래 Upload를 클릭후 PDF파일을 업로드하여
그 이후 문제를 제작해달라고 해보세요!`

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
    const [attachedFiles, setAttachedFiles] = useState<any[]>([]);
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
        if (assistant && assistant.id === "asst_K4r7EXhRTQ0JqewkgZGHkZIV" && conversations.length === 0) {
            setConversations((prev) => [...prev, { message: pdfIntroduce, isMe: false }])
        }
    }, [assistant])

    useEffect(() => {
        // if (scrollRef.current) {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
        // }
    }, [conversations])

    const mutation = useMutation({
        mutationFn: async (message: string) => {
            try {
                if (thread && assistant) {
                    setIsLoading(true);
                    setMessage('');

                    setConversations([...conversations, { message, isMe: true }])
                    //쓰레드에 메시지 추가
                    let aMTTRes = await addMesageToThread({ threadId: thread, content: message, file_ids: attachedFiles.map(v => v.id) })
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
                                }
                                else if (cRSRes.results.status === 'failed') {
                                    reject(new Error(cRSRes.results.last_error));
                                    return;
                                }
                                else if (cRSRes.results.status === 'completed') {
                                    let res = await getAssistantResponse(thread);
                                    console.log({ res });
                                    if (res.isSuccess) {
                                        // resolve(res.results.data[0].content[0].text.value); // 성공적으로 완료된 경우
                                        resolve(res.results.data)
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
        async onSuccess(data: any) {
            if (!thread) return;
            // 폴링 결과에 따라 성공 처리
            let messages = [];
            for (let row of data) {
                if (row.role === 'user') break;
                let message = row.content[0].text.value;
                messages.push({ message, isMe: false });
            }
            // let testRes = await getTTS({ message, voice: 'nova' });
            // setConversations([...conversations, { message, audioData: testRes.audioData, isMe: false }])
            setConversations([...conversations, ...messages])
            setIsLoading(false);
        },
        async onError(e) {
            setConversations([...conversations.slice(0, -1)])
            setIsLoading(false);
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


    const handleKeydown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSubmit();
        }
    }

    const getUploadFile = (files: any) => {
        console.log("파일 확인용", files);
        setAttachedFiles(files);
        return;
    }

    return (
        <StyledAssistantChatRoom>
            <Flex justify='center'>
                {assistant && <h1>{assistant.name}</h1>}
            </Flex>

            <Flex gap={'middle'} style={{ width: '100%', marginTop: '10px', padding: '5px' }}>
                <Flex gap={'middle'} vertical style={{ width: '100%' }}>
                    <Flex gap={'middle'} vertical align="center" className="conversationRoom">
                        {conversations.map((row, index) => (<ConverSationRow key={index} message={row.message} audioData={row.audioData} isMe={row.isMe}></ConverSationRow>))}
                        {isLoading && (<Spin></Spin>)}
                        <div ref={scrollRef}></div>
                    </Flex>

                    <Flex>
                        <UploadComponent getUploadFile={getUploadFile} setAttachedFiles={setAttachedFiles} />
                    </Flex>
                    <Flex gap={'middle'} justify="center" style={{ borderRadius: '1rem', borderWidth: '1px', borderColor: 'gray', border: '1px solid gray', background: 'white' }}>

                        <TextArea value={message} onChange={onChangeMessageEvent} onKeyDown={handleKeydown} rows={1} style={{ width: '97%', borderWidth: 0 }} autoSize={{ maxRows: 5 }}></TextArea>
                        <UpSquareFilled onClick={handleSubmit} />
                    </Flex>
                </Flex>
            </Flex>

        </StyledAssistantChatRoom>
    )
}

const ConverSationRow = ({ message, isMe = false }: { message: string, audioData?: any, isMe?: boolean }) => {
    // console.log({ message, isMe })
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [disabled, setDisabled] = useState<boolean>(false);
    const isAudioPlaying = () => {
        if (audioRef.current) {
            return !audioRef.current.paused;
        }
        return false;
    }

    const onClickEvent = async () => {
        if (audioRef.current) {
            if (!audioRef.current.src) {
                setDisabled(true);
                let testRes = await getTTS({ message, voice: 'nova' });
                setDisabled(false);
                if (testRes.isSuccess) {
                    audioRef.current.src = `data:audio/mp3;base64,${testRes.audioData}`
                    audioRef.current.play();
                }

            }
            else {
                audioRef.current.play();
            }

        }
    }

    const getFace = (message: string) => {
        if (message.includes("(슬픔)")) {
            return '/icons/assistant/face/슬픈표정.PNG'
        }
        else if (message.includes("(웃음)")) {
            return '/icons/assistant/face/웃는표정.PNG';
        }
        else {
            return '/icons/assistant/face/일반표정.PNG';
        }
    }

    return (
        <StyledConverSationRow className={isMe ? 'me' : 'und'}>
            {/* 프로필 영역 */}
            <Flex gap={'middle'}>
                <Flex gap={'middle'} vertical align={'center'} style={{ width: '15%', justifyContent: 'center', borderRight: '1px solid gray' }}>
                    {!isMe && (<img width={'120px'} height={'150px'} src={isMe ? `/icons/user/ChatGPT_logo.svg` : getFace(message)}></img>)}
                    <h3>{isMe ? 'You' : 'Assistant'}</h3>
                </Flex>
                <Flex gap={'middle'} style={{ width: '85%' }}>
                    <TypingEffect text={message} style={{ width: '95%' }}></TypingEffect>
                    <PlayCircleOutlined onClick={onClickEvent} disabled={disabled} />
                    <audio ref={audioRef}></audio>
                </Flex>
            </Flex>

        </StyledConverSationRow>
    )
}