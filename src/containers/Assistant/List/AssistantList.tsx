'use client';

import { Flex } from 'antd';
import { useEffect } from 'react';
import CardList from '../Card/List/CardList';

const AssistantList = () => {
  // const { assistants } = useAssistant();

  // useEffect(() => {
  //   console.log({ assistants });
  // }, [assistants]);

  return (
    <Flex gap="middle">
      <CardList />
    </Flex>
  );
};
export default AssistantList;
