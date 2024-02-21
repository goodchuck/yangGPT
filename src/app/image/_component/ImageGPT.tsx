"use client"
import OpenAI from 'openai';
import { useEffect, useState } from "react";

import { Flex, Input, Form, Button, Spin, Image } from 'antd';
const openai = new OpenAI({
    dangerouslyAllowBrowser: true,
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
});
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const { TextArea } = Input;

export const ImageGPT = () => {

    // AI가 뱉어주는 message
    const [message, setMessage] = useState<string>();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    // AI가 뱉어주는 결과물
    const [imageObjects, setImageObjects] = useState<any[]>();
    async function main(message: string) {
        setIsLoading(true);
        const image = await openai.images.generate({ model: "dall-e-3", prompt: message });

        console.log(image.data);
        setImageObjects(image.data);
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
                {!isLoading && imageObjects?.map((object, index) => (
                    <div key={index} >
                        <Image src={object.url} />
                        <p>{object.revised_prompt}</p>
                    </div>))}
            </div>
        </Flex>

    )
}