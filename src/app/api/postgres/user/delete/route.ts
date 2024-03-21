import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        let { userId } = await request.json();
        await sql`
        DELETE FROM users WHERE user_id = ${userId}
        `;
        return NextResponse.json(
            { isSuccess: true, message: `${userId} 삭제 성공` },
            { status: 200 }
        );
    } catch (e) {
        return NextResponse.json(
            { isSuccess: false, message: e.message },
            { status: 500 }
        );
    }
}
