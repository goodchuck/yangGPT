import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    // const { searchParams } = new URL(request.url);
    // const petName = searchParams.get("petName");
    // const ownerName = searchParams.get("ownerName");
    try {
        const pets = await sql`SELECT * FROM Pets;`;
        let rows = pets.rows;
        return NextResponse.json(
            { isSuccess: true, results: rows },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
