"use client"
import { useEffect, useState } from "react";

import { Flex, Input, Form, Button, Spin, Select } from 'antd';
import { getText } from '@/app/api/text';
import { getFineTuningJobsList } from "@/app/api/finetuning/finetuning";
import { getModels } from "@/app/api/models/ModelsAPI";
import { KakaoTalkChatRoom } from "./kakaoTalk/kakaoTalk";
import { AssistantMessage, GPTTextRequest } from "@/types/GPT/type";

const { TextArea } = Input;

export const TextGPT = () => {

    const [form] = Form.useForm();

    // 질문자의 질문 
    const [message, setMessage] = useState<string>();

    // 
    const [textGPTObject, setTextGPTObject] = useState<GPTTextRequest>(() => {
        // 로컬 스토리지 또는 세션 스토리지에서 값 가져오기
        const storedCount = localStorage.getItem('test');
        if (storedCount && Object.keys(JSON.parse(storedCount)).length > 0) {
            console.log("여기통과함?", storedCount)
            return JSON.parse(storedCount);
        }
        return { messages: [{ role: 'system', content: "You are a helpful assistant." }] }
    });

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
            setMessage(result);
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
        async function useEffectAsync() {
            let fineTunedList = await getFineTuningJobsList();
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

    useEffect(() => {
        // if (Object.keys(textGPTObject).length > 0) {
        localStorage.setItem('test', JSON.stringify(textGPTObject))
        console.log({ messageLogs: textGPTObject }, localStorage.getItem('test'))
        // }

    }, [textGPTObject])

    return (
        <Flex gap='middle' vertical>
            <KakaoTalkChatRoom data={textGPTObject}></KakaoTalkChatRoom>
            {isLoading && <Spin />}
            <Form form={form} name='nest-messages' onFinish={onFinish} style={{ minWidth: 600 }}>
                {/* <Form.Item name={'model'} label='model'>
                    <Select style={{ width: 120 }} showSearch onChange={handleChange} options={selectValue} filterOption={filterOption}></Select>
                </Form.Item> */}
                <Form.Item name={'message'} label='message' >
                    <TextArea showCount maxLength={200} onChange={onChange} placeholder='can resize'></TextArea>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType='submit'>Submit</Button>
                </Form.Item>

            </Form>
        </Flex>

    )
}