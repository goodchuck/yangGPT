import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

/**
 * 유저를 생성함
 * @param request
 * @returns
 */
export async function POST(request: Request) {
    try {
        let { roomName } = await request.json();
        await sql`
            UPDATE chat_Rooms
            SET Room_name = 'Karina님과의 방'
            WHERE room_id = ${roomName}
        `;
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
