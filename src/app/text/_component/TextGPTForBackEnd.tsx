"use client"
import { useEffect, useState } from "react";

import { Flex, Input, Form, Button, Spin, Select } from 'antd';
import { getText } from '@/app/api/text';
import { getFineTuningJobsList } from "@/app/api/finetuning/finetuning";
import { getModels } from "@/app/api/models/ModelsAPI";
import { KakaoTalkChatRoom } from "./kakaoTalk/kakaoTalk";
import { AssistantMessage, GPTTextRequest } from "@/types/GPT/type";
import { useQuery } from "@tanstack/react-query";
import { getUserObject } from "@/app/api/user/userAPI";
import { getChatRoom } from "@/app/api/chatRoom/chatRoom";
import { ChattingRoomsTypes } from "@/types/user/types";

const { TextArea } = Input;
type Props = {
    user?: any;
}
export const TextGPTForBackEnd = ({ user }: Props) => {
    const [form] = Form.useForm();
    if (!user) user = 'test';

    // const { data, isLoading: userLoading } = useQuery<any, Object, any, [_1: string, _2: string]>({
    //     queryKey: ['getUser', user],
    //     queryFn: getUserObject,
    // })

    const { data: chatRoomData, isLoading: chatLoading, isError } = useQuery<any, Object, any, [_1: string, _2: string]>({
        queryKey: ['getChatRoom', '0'],
        queryFn: getChatRoom
    })

    // if (!userLoading) {
    //     return (<div>유저 로딩중</div>)
    // };
    // if (!chatLoading) {
    //     return (<div>챗룸 로딩중</div>)
    // }
    // if (!data || !chatRoomData) return null
    // if (data && chatRoomData) {
    //     console.log(data)
    //     console.log(chatRoomData)
    // }

    //@ts-ignore
    const [textGPTObject, setTextGPTObject] = useState<GPTTextRequest>();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    // 모델 선택 select
    const [selectValue, setSelectValue] = useState<any[]>();

    async function main({ message, model = 'gpt-3.5-turbo' }: { model: string, message: string }) {
        setIsLoading(true);
        let reqMessage = JSON.parse(JSON.stringify(textGPTObject));
        console.log({ reqMessage }, model, 'first')
        reqMessage.messages = [...reqMessage.messages, { role: 'user', content: message }];
        let result = await getText(model, reqMessage.messages);
        if (result) {
            let assiMessage: AssistantMessage = { role: 'assistant', content: result };
            setTextGPTObject((prev) => {
                return {
                    ...prev,
                    messages: [...prev.messages, { role: 'user', content: message }, assiMessage]
                };
            })
        }

        setIsLoading(false);
    }

    const onFinish = (values: any) => {
        main(values)
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // console.log('change:', e.target.value);
    }

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    }

    // Filter `option.label` match the user type `input`
    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    useEffect(() => {
        if (!chatLoading && !isError) {
            console.log({ chatRoomData })
            setTextGPTObject(chatRoomData.results[0].GPTTextRequest as GPTTextRequest)
        }
    }, [chatRoomData, chatLoading, isError])


    useEffect(() => {
        async function useEffectAsync() {
            // let fineTunedList = await getFineTuningJobsList();
            // let lists = {
            //     label: 'fineTuningJobs',
            //     options: [...fineTunedList]
            //         .map((val) => { return { value: val.fine_tuned_model, label: val.id } }

            //         )
            // };
            // let modelList = await getModels();

            setSelectValue([
                {
                    label: 'default Model',
                    options: [{ value: 'gpt-3.5-turbo', label: 'gpt-3.5-turbo' }
                    ]
                }]);
        }
        useEffectAsync();
    }, [])

    // useEffect(() => {
    //     // if (Object.keys(textGPTObject).length > 0) {
    //     localStorage.setItem(user, JSON.stringify(textGPTObject))
    //     console.log({ messageLogs: textGPTObject }, localStorage.getItem(user))
    //     // }

    // }, [textGPTObject])

    return (
        <Flex gap='middle' vertical>
            {textGPTObject && <KakaoTalkChatRoom user={chatRoomData.results[0].user} assistant={chatRoomData.results[0].assistant} data={textGPTObject} />}
            {isLoading && <Spin />}
            <Form form={form} name='nest-messages' onFinish={onFinish} style={{ minWidth: 600 }}>
                {/* <Form.Item name={'model'} label='model'>
                    <Select style={{ width: 120 }} showSearch onChange={handleChange} options={selectValue} filterOption={filterOption}></Select>
                </Form.Item> */}
                <Form.Item name={'message'}>
                    <TextArea showCount maxLength={500} onChange={onChange} placeholder='can resize'></TextArea>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType='submit'>Submit</Button>
                </Form.Item>

            </Form>
        </Flex>

    )
}