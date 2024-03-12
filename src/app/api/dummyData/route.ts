import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { messageObject } from "@/_dummyData/heartki2";

export async function GET(request: Request) {
    // JSONL 파일 경로
    const dummyDataFolderPath = path.join(process.cwd(), "dummyData");
    const filePath = path.join(dummyDataFolderPath, "heartki2.jsonl");

    if (!fs.existsSync(dummyDataFolderPath)) {
        fs.mkdirSync(dummyDataFolderPath);
    }
    let message = messageObject;

    let lastMessage = `참고로 내가 활동하는 주소는 여기아래!
        youtube:
        https://www.youtube.com/@heart_ki

        linktr.ee:
        https://linktr.ee/heartki
        여기있으니까 참고하면 좋을 거같아!
    `;
    const jsonlData = message
        .map((obj) => {
            let deepCopyObj = JSON.parse(JSON.stringify(obj));
            deepCopyObj.messages.shift();
            let lastMessageObject = deepCopyObj.messages.at(-1);
            lastMessageObject.content += lastMessage;

            return JSON.stringify(deepCopyObj);
        })
        .join("\n");
    fs.writeFile(filePath, jsonlData, "utf-8", (err) => {
        if (err) {
            console.error(err);
            return NextResponse.json({ err }, { status: 500 });
        }
        return NextResponse.json({ message: "생성완료" }, { status: 200 });
    });

    return NextResponse.json(
        { dummyDataFolderPath, filePath },
        { status: 200 }
    );
}
