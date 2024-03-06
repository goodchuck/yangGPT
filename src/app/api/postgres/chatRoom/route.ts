import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const userId = new URL(request.url).searchParams.get("userId");
        let res;
        if (userId) {
            res =
                await sql`SELECT * FROM chat_rooms WHERE User_id = ${userId};`;
        } else {
            res = await sql`SELECT * FROM chat_rooms;`;
        }

        let rows = res.rows;
        const jsonResponse = NextResponse.json(
            { isSuccess: true, results: rows },
            { status: 200 }
        );
        // Disable caching
        jsonResponse.headers.set("Cache-Control", "no-store");

        return jsonResponse;
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
