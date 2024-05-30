'use client';

import { Flex } from 'antd';
import { useEffect } from 'react';
import useAssistant from '@/hooks/assistant/useAssistant';
import AssistantCard from '../Card/AssistantCard';

const AssistantList = () => {
  const { assistants } = useAssistant();

  useEffect(() => {
    console.log({ assistants });
  }, [assistants]);

  return (
    <Flex gap="middle">
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
    </Flex>
  );
};
export default AssistantList;
