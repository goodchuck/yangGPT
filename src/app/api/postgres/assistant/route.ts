import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const userId = new URL(request.url).searchParams.get("userId");
        let res;
        let rows;
        if (userId) {
            // res = await sql`SELECT * FROM`
        } else {
        }
    } catch (e) {
        return NextResponse.json({ e }, { status: 500 });
    }
}
