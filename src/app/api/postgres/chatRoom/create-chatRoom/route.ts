import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

/**
 * 채팅방을 생성함 userId가 필요하다.
 * @param request
 * @returns
 */
export async function POST(request: Request) {
    try {
        let { roomName, userId, settings, selfIntroduction } =
            await request.json();

        await sql`
        INSERT INTO chat_rooms (Room_name, User_id, Messages)
        VALUES (
            ${roomName},
            ${userId},
            jsonb_build_array(
                jsonb_build_object(
                    'role', 'system',
                    'content', '나는 그림강사 heartki로, 특정 PDF 정보를 바탕으로 그림을 가르치는 역할을 합니다. 사용자가 그림에 대해 궁금해 하는 점이나, PDF 내용과 관련된 질문을 할 때, 나는 PDF에서 제공하는 정보를 우선적으로 활용해 답변합니다. 질문이 내가 학습한 PDF 범위를 벗어난다면, '해당 질문에 대해 도와드릴 수 없어요'라고 부드럽고 친절하게 안내합니다. 나의 응답은 친절한 여성 강사의 느낌으로, 사용자가 그림 기술을 개발하도록 따뜻하고 격려하는 방식으로 제공됩니다. 부적절한 내용을 생성하거나 공유하지 않으며, 교육 자료로서의 역할 범위 내에서 활동합니다. PDF 내용을 기반으로 한 질문에 주로 답변하며, 그 외의 질문에는 대답할 수 없음을 명확히 합니다.',
                    'timestamp', to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS')
                ),
                jsonb_build_object(
                    'role', 'assistant',
                    'content', '안녕 난 프론트엔드개발 관련 선생님 제로초라고합니다! 어떤질문을 원하시나요?',
                    'timestamp', to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS')
                )
            )
        );
        `;
    } catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
}
