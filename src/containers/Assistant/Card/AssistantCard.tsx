'use client';

import React from 'react';
import { Avatar, Button, Card, Image } from 'antd';
import { useRouter } from 'next/navigation';
import useLoadingStore from '@/store/loadingStore';
import { motion } from 'framer-motion';
import { StyledMotionCard } from './AssistantCard.style';

const { Meta } = Card;

const cardVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      // repeatType: 'mirror',
      // repeat: Infinity,
    },
  },
};

type Props = {
  assistant: any;
  isPreparing?: boolean;
};

const AssistantCard = ({ assistant, isPreparing = false }: Props) => {
  const router = useRouter();
  const setLoading = useLoadingStore((state) => state.setLoading);
  const onHandleClickBtn = (assistantId: string) => {
    if (isPreparing) {
      alert('UI공사중입니다! 양해부탁바랍니다 ㅠㅠ');
      return;
    }
    setLoading(true);
    router.push(`assistant/chatting/${assistantId}`);
  };
  return (
    <motion.div
      style={{ width: '300px', margin: '10px' }}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <Card
        cover={
          <Image alt="example" src={`/icons/assistant/${assistant.id}.png`} />
        }
        actions={[
          <Button
            key="go-to-chat"
            onClick={() => {
              onHandleClickBtn(assistant.id);
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
    </motion.div>
  );
};

export default AssistantCard;
