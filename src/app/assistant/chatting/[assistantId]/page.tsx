import { AssistantChatRoom } from "../../_component/AssistantChatRoom";


type Props = {
    params: { assistantId: string };
}

/**
 * assistant 의 채팅 페이지
 */
export default function Page({ params }: Props) {
    const { assistantId } = params;

    return (
        <>
            <AssistantChatRoom assistantId={assistantId} />
        </>
    )
}