"use client"
import { useEffect, useState } from "react";

import { Flex, Input, Form, Button, Spin, Select } from 'antd';
import { getText } from '@/app/api/text';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getChatRoom } from "@/app/api/chatRoom/chatRoom";
import { KakaoTalkChatRoom } from "./kakaoTalk/kakaoTalk";
import { useRouter } from "next/navigation";

const { TextArea } = Input;

type Props = {
    user?: any;
}

export const TextGPTForBackEnd = ({ user }: Props) => {
    const [form] = Form.useForm();
    if (!user) user = 'test';
    const queryClient = useQueryClient();
    const router = useRouter();

    /**
     * 상대방의 id를 통해 채팅방을 가져온다.
     */
    const { data: chatRoomData, isLoading: chatLoading, isError } = useQuery<{ isSuccess: boolean, results: chatRoomTypes[] }, Object, { isSuccess: boolean, results: chatRoomTypes[] }, [_1: string, _2: string]>({
        queryKey: ['getChatRoom', user],
        queryFn: getChatRoom
    })


    const [isLoading, setIsLoading] = useState<boolean>(false);

    const mutation = useMutation({
        mutationFn: async (e: any) => {
            // console.log('mutation테스트', e);
            let { model, messages } = e;

            // return;
            return await getText({ model, messages });
        },
        async onMutate(e: any) {
            let { model, messages } = e;
            // console.log('mutate', { model, messages })
            const queryCache = queryClient.getQueryCache()
            const queryKeys = queryCache.getAll().map(cache => cache.queryKey)
            console.log('queryKeys', queryKeys, e);
            queryKeys.forEach((queryKey) => {
                if (queryKey[0] === 'getChatRoom') {
                    const value: { isSuccess: boolean, results: chatRoomTypes[] } | undefined = queryClient.getQueryData(queryKey);
                    if (value && value.isSuccess) {
                        console.log({ value })
                        let lastMessage = messages.at(-1);
                        const shallow = JSON.parse(JSON.stringify(value));
                        shallow.results[0].messages = [
                            ...shallow.results[0].messages,
                            lastMessage
                        ]
                        queryClient.setQueryData(queryKey, shallow);
                    }
                }
            })
        },
        async onSuccess(response, variable) {
            if (response) {
                console.log({ response, variable })
                let lastUserMessage = variable.messages.at(-1);
                let lastAssMessage = { role: 'assistant', content: response };

                let result = await fetch(`/api/postgres/chatRoom/add-chat-message`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: [lastUserMessage, lastAssMessage],
                        roomId: chatRoomData?.results[0].room_id
                    })
                })
                if (result.ok) {
                    queryClient.invalidateQueries({ queryKey: ['getChatRoom', user] });
                    onReset();
                }


                // let result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/add/message`, {
                //     method: 'post',
                //     headers: {
                //         'Content-Type': 'application/json'
                //     },
                //     body: JSON.stringify({
                //         message: [lastUserMessage, lastAssMessage],
                //         assistant: chatRoomData.results[0].assistant
                //     })
                // })
                setIsLoading(false);

            }
        },
        onError(error) {
            // let { model, messages } = e;
            // console.log('mutate', { model, messages })
            const queryCache = queryClient.getQueryCache()
            const queryKeys = queryCache.getAll().map(cache => cache.queryKey)
            console.log('queryKeys', queryKeys,);
            queryKeys.forEach((queryKey) => {
                if (queryKey[0] === 'getChatRoom') {
                    const value: { isSuccess: boolean, results: chatRoomTypes[] } | undefined = queryClient.getQueryData(queryKey);
                    if (value && value.isSuccess) {
                        console.log({ value })
                        const shallow = JSON.parse(JSON.stringify(value));
                        shallow.results[0].messages = shallow.results[0].messages.slice(0, -1);
                        queryClient.setQueryData(queryKey, shallow);
                    }
                }
            })
            setIsLoading(false);
        }
    })

    async function main({ message, model = 'gpt-3.5-turbo' }: { model: string, message: string }) {
        setIsLoading(true);
        if (chatRoomData) {
            let messages = chatRoomData.results[0].messages;
            let reqMessage = JSON.parse(JSON.stringify(messages));
            reqMessage = [...reqMessage, { role: 'user', content: message }];
            mutation.mutate({ model, messages: reqMessage })
        }

    }

    const onFinish = (values: any) => {
        main(values)
    }

    const onReset = () => {
        form.resetFields();
    };

    useEffect(() => {
        if (chatRoomData && !chatLoading && !isError) {
            console.log({ chatRoomData })
            if (!chatRoomData.isSuccess) {
                // setTextGPTObject([]);
                return;
            }
            // setTextGPTObject(chatRoomData.results[0].GPTTextRequest as GPTTextRequest)
        }
    }, [chatRoomData, chatLoading, isError])

    const backButton = () => {
        router.replace('/girl-friend/friends')
    }


    return (
        <Flex gap='middle' vertical>
            <Flex gap='middle' align={'center'} >
                <Button type="primary" onClick={backButton}>뒤로 가기</Button>
                <h3>{chatRoomData && chatRoomData.isSuccess && chatRoomData.results[0].room_name}</h3>
            </Flex>
            {chatRoomData && chatRoomData.isSuccess && <KakaoTalkChatRoom isLoading={isLoading} data={chatRoomData.results[0]} />}
            <Form form={form} name='nest-messages' onFinish={onFinish} style={{ minWidth: 600 }}>
                <Form.Item name={'message'}>
                    <TextArea showCount maxLength={500} placeholder='can resize'></TextArea>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType='submit'>Submit</Button>
                </Form.Item>

            </Form>
        </Flex>

    )
}