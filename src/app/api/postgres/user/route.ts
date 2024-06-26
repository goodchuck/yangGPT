import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const userId = new URL(request.url).searchParams.get("userId");
        let Users;
        if (userId) {
            Users = await sql`SELECT * FROM users WHERE User_id = ${userId};`;
        } else {
            Users = await sql`SELECT * FROM users;`;
        }

        let rows = Users.rows;
        return NextResponse.json(
            { isSuccess: true, results: rows },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
