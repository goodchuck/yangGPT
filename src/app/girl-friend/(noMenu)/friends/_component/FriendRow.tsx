"use client"
import { useRouter } from "next/navigation";

/**
 * 카카오톡 친구 하나당 행
 * @returns 
 */
export const FriendRow = () => {
    const router = useRouter();

    const onDoubleClickEvent = () => {
        let name = 'karina';
        router.push(`/girl-friend/chatting/${name}`)
    }

    return (
        <li onDoubleClick={onDoubleClickEvent}>
            <div>
                <img
                    src={'/icons/user/카리나1.PNG'}
                    alt="profile Image"
                //   onClick={profileImgClick}
                />
                <div>
                    <p>
                        <b>{'카리나'}</b>
                    </p>
                    <p>{'에스파 소속이에요!'}</p>
                </div>

            </div>

        </li>
    )
}