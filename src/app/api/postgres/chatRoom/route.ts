import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { getCurrentTime } from "@/lib/lib";
/**
 * userId를 받아 해당 user가 AI 어시스턴트인 방을 찾는다.
 * @param request
 * @returns
 */
export async function GET(request: Request) {
    try {
        const userId = new URL(request.url).searchParams.get("userId");
        let res;
        let rows;
        let object;
        if (userId) {
            res =
                await sql`SELECT * FROM chat_rooms WHERE User_id = ${userId};`;
            rows = res.rows;
            if (rows.length === 0) {
                // return fetch("/api/postgres/chatRoom", { method: "post" });
            } else {
                object = {
                    isSuccess: true,
                    results: rows,
                };
            }
        } else {
            res = await sql`SELECT * FROM chat_rooms;`;
            rows = res.rows;
            object = {
                isSuccess: true,
                results: rows,
            };
        }

        const jsonResponse = NextResponse.json(object, { status: 200 });
        // Disable caching
        jsonResponse.headers.set("Cache-Control", "no-store");

        return jsonResponse;
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
/**
 * 방을 생성하는 요청
 * @param request
 * @returns
 */
export async function POST(request: Request) {
    try {
        const currentTime = getCurrentTime();
        // 요청에서 JSON 형식의 데이터를 추출합니다.
        // let { message, userId } = await request.json();
        let userId = 4;
        let message = [
            {
                role: "system",
                content: "넌 20대 남자야",
            },
        ];
        let stringMessage = JSON.stringify(message);
        const res = await sql`
        INSERT INTO chat_Rooms (Room_name, User_id, Messages)
        VALUES ('Room ${userId}',${userId}, ${stringMessage}::jsonb)
        `;
        return NextResponse.json(
            { isSuccess: true, results: res },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
