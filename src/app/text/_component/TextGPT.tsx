"use client"
import { useEffect, useState } from "react";

import { Flex, Input, Form, Button, Spin, Select } from 'antd';
import { getText } from '@/app/api/text';
import { getFineTuningJobsList } from "@/app/api/finetuning/finetuning";
import { getModels } from "@/app/api/models/ModelsAPI";
import { KakaoTalkChatRoom } from "./kakaoTalk/kakaoTalk";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const { TextArea } = Input;

type MessageLogs = {
    question: string;
    answer: string;
}

export const TextGPT = () => {
    const [form] = Form.useForm();
    const [message, setMessage] = useState<string>();
    const [messageLogs, setMessageLogs] = useState<MessageLogs[]>(() => {
        // 로컬 스토리지 또는 세션 스토리지에서 값 가져오기
        const storedCount = localStorage.getItem('test');
        // 저장된 값이 있으면 파싱하여 반환하고, 없으면 기본값인 0을 반환
        return storedCount ? JSON.parse(storedCount) : [];
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectValue, setSelectValue] = useState<any[]>();
    async function main({ message, model }: { model: string, message: string }) {
        setIsLoading(true);
        let result = await getText(model, message);
        if (result) {
            setMessage(result);
            setMessageLogs((prev) => [...prev, { question: message, answer: result }])
        }
        setIsLoading(false);
    }

    const onReset = () => {
        form.resetFields();
    }
    const onFill = () => {
        form.setFieldsValue({ note: 'Hello world!', gender: 'male' });
    };

    const onFinish = (values: any) => {
        main(values)
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // console.log('change:', e.target.value);
    }

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    }

    useEffect(() => {
        async function useEffectAsync() {
            let fineTunedList = await getFineTuningJobsList();
            let lists = {
                label: 'fineTuningJobs',
                options: [...fineTunedList]
                    .map((val) => { return { value: val.fine_tuned_model, label: val.id } }

                    )
            };
            let modelList = await getModels();

            setSelectValue([
                {
                    label: 'default Model',
                    options: [{ value: 'gpt-3.5-turbo', label: 'gpt-3.5-turbo' }
                    ]
                }, lists]);
        }
        useEffectAsync();

    }, [])

    useEffect(() => {

        localStorage.setItem('test', JSON.stringify(messageLogs))
        console.log({ messageLogs }, localStorage.getItem('test'))
    }, [messageLogs])

    return (
        <Flex gap='middle' vertical>
            <KakaoTalkChatRoom data={messageLogs}></KakaoTalkChatRoom>
            {isLoading && <Spin />}
            <Form form={form} name='nest-messages' onFinish={onFinish} style={{ minWidth: 600 }}>
                <Form.Item name={'model'} label='model'>
                    <Select style={{ width: 120 }} onChange={handleChange} options={selectValue}></Select>
                </Form.Item>
                <Form.Item name={'message'} label='message' >
                    <TextArea showCount maxLength={200} onChange={onChange} placeholder='can resize'></TextArea>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType='submit'>Submit</Button>
                </Form.Item>
                {/* <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                >
                    {({ getFieldValue }) =>
                        getFieldValue('gender') === 'other' ? (
                            <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        ) : null
                    }
                </Form.Item> */}
            </Form>
        </Flex>

    )
}