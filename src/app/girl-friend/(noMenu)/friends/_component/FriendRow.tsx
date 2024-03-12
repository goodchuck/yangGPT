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
    const { id, username, status_message, user_id } = User;
    const onDoubleClickEvent = () => {
        router.push(`/girl-friend/chatting/${user_id}`)
    }

    return (
        <li onDoubleClick={onDoubleClickEvent}>
            <div>
                <img
                    src={`/icons/user/${id}1.PNG`}
                    alt="profile Image"
                //   onClick={profileImgClick}
                />
                <div>
                    <p>
                        <b>{username}</b>
                    </p>
                    <p>{status_message}</p>
                </div>

            </div>

        </li>
    )
}