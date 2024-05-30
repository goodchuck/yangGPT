'use client';

import { useQueryClient } from '@tanstack/react-query';
import { Flex } from 'antd';
import { useEffect } from 'react';
import AssistantCard from '../Card/AssistantCard';

const AssistantList = () => {
  const queryClient = useQueryClient();
  const data: { isSuccess: boolean; results: any[] } | undefined =
    queryClient.getQueryData(['assistant']);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Flex gap="middle">
      {data &&
        data.results?.map((assistant, i) => {
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
