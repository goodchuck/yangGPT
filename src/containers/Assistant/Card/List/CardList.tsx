'use client';

import React, { useEffect } from 'react';
import useAssistant from '@/hooks/assistant/useAssistant';
import { StyledCardListContainer } from './CardList.styles';
import AssistantCard from '../AssistantCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 5,
    },
  },
};

interface CardListProps {
  children: React.ReactNode;
}

const CardList = () => {
  // const controls = useAnimationControls();
  const { assistants } = useAssistant();
  // useEffect(() => {
  //   controls.start('show');
  // }, [children, controls]);

  return (
    <StyledCardListContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {assistants &&
        assistants.map((assistant, i) => {
          let isPreparing = true;
          if (assistant.id === 'asst_K4r7EXhRTQ0JqewkgZGHkZIV')
            isPreparing = false;
          return (
            <AssistantCard
              key={`${i + Math.random()}`}
              assistant={assistant}
              isPreparing={isPreparing}
            />
          );
        })}
    </StyledCardListContainer>
  );
};

export default CardList;
