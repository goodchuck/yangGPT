'use client';

import React from 'react';
import StyledAssistantChatRoom from '../AssistantChatRoom/AssistantChatRoom.style';
import AssistantRequestForm from '../../RequestForm/AssistantRequestForm';

type Props = {
  assistantId: string;
};

const AssistantChatRoomV2 = ({ assistantId }: Props) => {
  // const handleKeydown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
  //     if (event.key === 'Enter') {
  //         event.preventDefault();
  //         handleSubmit();
  //     }
  // }

  return (
    <StyledAssistantChatRoom>
      <AssistantRequestForm assistantId={assistantId} />
    </StyledAssistantChatRoom>
  );
};

export default AssistantChatRoomV2;
