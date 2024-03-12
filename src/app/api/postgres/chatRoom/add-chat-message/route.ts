import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

/**
 * 채팅 메시지를 추가하는 로직
 * message와 roomId를 받아 마지막 메시지들을 추가한다.
 * @param request
 * @returns
 */
export async function POST(request: Request) {
    try {
        // const requestBody = await request.text();

        // 현재 시간을 가져옵니다.
        const currentTime = new Date().toISOString();

        // 요청에서 JSON 형식의 데이터를 추출합니다.
        let { message, roomId } = await request.json();
        message = message.map((row: any) => {
            return {
                ...row,
                timestamp: currentTime,
            };
        });
        // 쿼리에 삽입할 데이터를 포맷합니다.
        const queryMessage = JSON.stringify(message);
        // const bodyJson = JSON.parse(requestBody);

        // 받은 데이터를 이용하여 원하는 작업을 수행합니다.
        // console.log("Received body:", bodyJson);

        // SQL 쿼리를 실행하여 데이터베이스에 삽입합니다.
        await sql`
            UPDATE chat_rooms
            SET messages = messages || ${queryMessage}::jsonb
            WHERE room_id = ${roomId}
        `;

        // 응답 반환
        return NextResponse.json(
            { isSuccess: true, message: "데이터가 성공적으로 추가되었습니다." },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
