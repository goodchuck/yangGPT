import { AssistantChatRoom } from "../../_component/AssistantChatRoom/AssistantChatRoom";
import { AssistantChatRoom2 } from "../../_component/AssistantChatRoom2";


type Props = {
    params: { assistantId: string };
}

/**
 * assistant 의 채팅 페이지
 * 여기서 gpt의 효과에따라 맞는 chatRoom을 만들 예정
 */
export default function Page({ params }: Props) {
    const { assistantId } = params;

    return (
        <>
            {/* {
                assistantId === 'asst_K4r7EXhRTQ0JqewkgZGHkZIV' ? (<AssistantChatRoom2 assistantId={assistantId} />) : (<AssistantChatRoom assistantId={assistantId} />)
            } */}
            {/* <AssistantChatRoom assistantId={assistantId} /> */}
            <AssistantChatRoom2 assistantId={assistantId}></AssistantChatRoom2>
        </>
    )
}