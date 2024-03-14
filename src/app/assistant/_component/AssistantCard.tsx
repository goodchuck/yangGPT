"use client"
import React from "react";
import { Card } from 'antd';
import { useRouter } from "next/navigation";
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
            hoverable
            style={{ width: 350 }}
            cover={<img alt="example" src={`/icons/assistant/${assistant.id}.jpg`}
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    e.target.src = "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png";
                }}
                onDoubleClick={() => { onDoubleClickEvent(assistant.id) }} />}
        >
            <Meta title={assistant.name} description={assistant.instructions} />
        </Card>
    )
}