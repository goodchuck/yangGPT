"use client"
import React from "react";
import { Avatar, Button, Card, Skeleton } from 'antd';
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
            style={{ width: 300 }}
            cover={
                <img
                    alt="example"
                    src={`/icons/assistant/${assistant.id}.png`}
                />
            }
            actions={[
                <Button onClick={() => { onDoubleClickEvent(assistant.id) }} >대화 하러 가기</Button>,
                // <EditOutlined key="edit" />,
                // <EllipsisOutlined key="ellipsis" />,
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