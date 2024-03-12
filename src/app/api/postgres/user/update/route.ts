import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

/**
 * 유저 정보 변경
 * @param request
 * @returns
 */
export async function POST(request: Request) {
    try {
        // let {userId,userName,eMail,passWord,targetUser} = await request.json();

        const setClause = [];
        const values = [];
        let placeholderIndex = 1;
        let { userId, ...updates } = await request.json();
        for (const [key, value] of Object.entries(updates)) {
            setClause.push(`${key} = $${placeholderIndex}`);
            values.push(value);
            placeholderIndex++;
        }

        values.push(userId);

        let clauseStrings = setClause.join(", ");
        console.log(clauseStrings);

        let client = await sql.connect();
        let queryString = `UPDATE users SET ${clauseStrings} WHERE User_id = $${placeholderIndex}`;
        await client.query(queryString, values);
        return NextResponse.json(
            { isSuccess: true, results: "성공" },
            { status: 200 }
        );
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
