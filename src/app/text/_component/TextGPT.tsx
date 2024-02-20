"use client"
import OpenAI from 'openai';
import { useEffect, useState } from "react";
console.log('확', process.env.NEXT_PUBLIC_OPENAI_API_KEY)

import { Flex, Input, Form, Button, Spin } from 'antd';
const openai = new OpenAI({
    dangerouslyAllowBrowser: true,
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
});
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const { TextArea } = Input;

export const TextGPT = () => {
    const [message, setMessage] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    async function main(message: string) {
        setIsLoading(true);
        const completion = await openai.chat.completions.create({
            messages: [
                { "role": "user", "content": message }],
            model: "gpt-3.5-turbo",
        });
        console.log(completion.choices[0]);
        if (completion.choices[0].message.content) {
            setMessage(completion.choices[0].message.content);
        }
        setIsLoading(false);
    }
    const onFinish = (values: any) => {
        main(values.message)
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // console.log('change:', e.target.value);
    }

    return (
        <Flex gap='middle' vertical>
            <Form name='nest-messages' onFinish={onFinish} style={{ maxWidth: 600 }}>
                <Form.Item name={'message'} label='message' >
                    <TextArea showCount maxLength={200} onChange={onChange} placeholder='can resize'></TextArea>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType='submit'>Submit</Button>
                </Form.Item>
            </Form>
            <div>
                {isLoading && <Spin />}
                {!isLoading && message}
            </div>
        </Flex>

    )
}