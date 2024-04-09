"use client"
import React from "react";
import { Avatar, Button, Card, Image, Skeleton } from 'antd';
import { useRouter } from "next/navigation";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
const { Meta } = Card;

type Props = {
    assistant: any;
}

export const AssistantCard = ({ assistant }: Props) => {
    const router = useRouter();
    const onDoubleClickEvent = (assistantId: string) => {
        router.push(`assistant/chatting/${assistantId}`)
    }
    return (
        <Card
            style={{ width: '300px' }}
            cover={
                <Image
                    alt="example"
                    src={`/icons/assistant/${assistant.id}.png`}
                />
            }
            actions={[
                <Button key='go-to-chat' onClick={() => { onDoubleClickEvent(assistant.id) }} >대화 하러 가기</Button>
            ]}

        >
            <Meta
                avatar={<Avatar src="/icons/user/ChatGPT_logo.svg" />}
                title={assistant.name}
                description="준비중"
            />

        </Card>
    )
}