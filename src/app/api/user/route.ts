const baseURL = process.env.API_BASE_URL || "http://localhost:3000";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

function getExtensionFromMimeType(mimeType: string) {
    switch (mimeType) {
        case "image/jpeg":
            return ".jpg";
        case "image/png":
            return ".png";
        case "image/gif":
            return ".gif";
        case "image/svg+xml":
            return ".svg";
        // 여기에 더 많은 MIME 타입을 추가할 수 있습니다.
        default:
            return "";
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const profileFile = formData.get("profileImage") as File;

        let buffer = null;
        if (profileFile) {
            buffer = Buffer.from(await profileFile.arrayBuffer());
        }

        const userId = formData.get("userId");
        console.log({ profileFile, userId });
        const publicFolderPath = path.join(
            process.cwd(),
            "public",
            "icons",
            "user"
        );
        const fileName = `${userId}${getExtensionFromMimeType(
            profileFile.type
        )}`;
        const filePath = path.join(publicFolderPath, fileName);
        // if (profileImage.type.split("/jpeg") !== -1) {
        console.log({ publicFolderPath, filePath });
        if (buffer) {
            await fs.promises.writeFile(filePath, buffer);
        }

        // }

        return NextResponse.json(
            { isSuccess: true, result: fileName },
            { status: 200 }
        );
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        return NextResponse.json(
            { isSuccess: true, message: "hi" },
            { status: 200 }
        );
    } catch (e) {
        return NextResponse.json(
            { isSuccess: true, message: "hi" },
            { status: 500 }
        );
    }
}
