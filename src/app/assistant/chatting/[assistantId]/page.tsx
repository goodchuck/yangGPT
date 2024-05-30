import AssistantChatRoomV2 from '@/containers/Assistant/ChatRoom/AssistantChatRoomV2/AssistantChatRoomV2';

type Props = {
  params: { assistantId: string };
};

/**
 * assistant 의 채팅 페이지
 * 여기서 gpt의 효과에따라 맞는 chatRoom을 만들 예정
 */
export default function Page({ params }: Props) {
  const { assistantId } = params;

  return <AssistantChatRoomV2 assistantId={assistantId} />;
}
