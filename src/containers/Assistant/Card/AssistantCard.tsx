'use client';

import React from 'react';
import { Avatar, Button, Card, Image } from 'antd';
import { useRouter } from 'next/navigation';

const { Meta } = Card;

type Props = {
  assistant: any;
  isPreparing?: boolean;
};

function AssistantCard({ assistant, isPreparing = false }: Props) {
  const router = useRouter();
  const onDoubleClickEvent = (assistantId: string) => {
    if (isPreparing) {
      alert('UI공사중입니다! 양해부탁바랍니다 ㅠㅠ');
      return;
    }
    router.push(`assistant/chatting/${assistantId}`);
  };
  return (
    <Card
      style={{ width: '300px' }}
      cover={
        <Image alt="example" src={`/icons/assistant/${assistant.id}.png`} />
      }
      actions={[
        <Button
          key="go-to-chat"
          onClick={() => {
            onDoubleClickEvent(assistant.id);
          }}
        >
          대화 하러 가기
        </Button>,
      ]}
    >
      <Meta
        avatar={<Avatar src="/icons/user/ChatGPT_logo.svg" />}
        title={assistant.name}
        description="준비중"
      />
    </Card>
  );
}

export default AssistantCard;
