import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const Users = await sql`SELECT * FROM users;`;
        let rows = Users.rows;
        console.log(Users);
        return NextResponse.json(
            { isSuccess: true, results: rows },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
