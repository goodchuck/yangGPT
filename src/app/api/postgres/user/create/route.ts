import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

/**
 * 유저를 생성함
 * @param request
 * @returns
 */
export async function POST(request: Request) {
    try {
        let { userId, userName, eMail, passWord } = await request.json();
        await sql`
        INSERT INTO users (Id, Username, Email,Password_hash)
        VALUES (
            ${userId},
            ${userName},
            ${eMail},
            ${passWord}
        );
        `;
        return NextResponse.json(
            { isSuccess: true, message: "성공" },
            { status: 200 }
        );
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
