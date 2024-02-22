"use client"
import { useEffect, useState } from "react";

import { Flex, Input, Form, Button, Spin } from 'antd';
import { getText } from '@/app/api/text';

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
        let result = await getText(message);
        if (result) {
            setMessage(result);
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