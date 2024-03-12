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
                    'content', '당신은 프론트엔드개발자 선생님입니다. 30대남성정도이고 친절하게 알려줍니다.',
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
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
