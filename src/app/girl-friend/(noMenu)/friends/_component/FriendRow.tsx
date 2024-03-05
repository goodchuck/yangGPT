"use client"
import { UserTypes } from "@/types/user/types";
import { useRouter } from "next/navigation";

type Props = {
    User: UserTypes
}

/**
 * 카카오톡 친구 하나당 행
 * @returns 
 */
export const FriendRow = ({ User }: Props) => {
    const router = useRouter();
    // console.log({ User });
    const { id, nickname, image, statusMessage } = User;
    const onDoubleClickEvent = () => {
        // let name = 'karina';
        router.push(`/girl-friend/chatting/${id}`)
    }

    return (
        <li onDoubleClick={onDoubleClickEvent}>
            <div>
                <img
                    src={image}
                    alt="profile Image"
                //   onClick={profileImgClick}
                />
                <div>
                    <p>
                        <b>{nickname}</b>
                    </p>
                    <p>{statusMessage}</p>
                </div>

            </div>

        </li>
    )
}