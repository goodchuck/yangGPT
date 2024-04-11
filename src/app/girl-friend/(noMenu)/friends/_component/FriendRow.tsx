"use client"
import { useState } from "react";
import { UserTypes } from "@/types/user/types";
import { useRouter } from "next/navigation";
import { DeleteOutlined } from "@ant-design/icons";
import { StyledFriendRow } from "./StyledFriendRow";
import { deleteUser } from "@/app/api/user/userAPI";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Modal, Result } from "antd";
type Props = {
    User: UserTypes
    targetUser: number;
    setTargetUser: any;
}

/**
 * 카카오톡 친구 하나당 행
 * @returns 
 */
export const FriendRow = ({ User, targetUser, setTargetUser }: Props) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { id, username, status_message, user_id, profileurl } = User;

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();
    const onDoubleClickEvent = () => {
        router.push(`/girl-friend/chatting/${user_id}`)
    }

    const onDeleteClickEvent = async () => {
        try {
            let data = await deleteUser(user_id);
            console.log({ data })
            if (data.isSuccess) {
                queryClient.invalidateQueries({ queryKey: ['getFriends', 'test'] });
                queryClient.refetchQueries({ queryKey: ['getFriends', 'test'] });

            }
            setIsModalOpen(!isModalOpen);
        }
        catch (e: any) {
            console.log("에러 와줌?", e, e.message)
            setIsError(true);
            setErrorMessage(e.message);
            // throw e;
        }

    }

    const onSetModalOpenClickEvent = async () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleCancel = async () => {
        setIsModalOpen(false);
        setIsError(false);
        setErrorMessage(undefined);
    }

    return (
        <StyledFriendRow onDoubleClick={onDoubleClickEvent} onClick={() => setTargetUser(user_id)} className={targetUser === user_id ? 'active' : ''}>
            <div>
                <img
                    src={`/icons/user/${profileurl}`}
                    alt="profile Image"
                //   onClick={profileImgClick}
                />
                <div className="value-wrapper">
                    <div className='left'>
                        <p>
                            <b>{username}</b>
                        </p>
                        <p>{status_message}</p>

                    </div>
                    <div className="right">
                        <DeleteOutlined onClick={() => { onSetModalOpenClickEvent() }}></DeleteOutlined>

                    </div>
                </div>
            </div>
            <Modal
                title='유저 삭제'
                open={isModalOpen}
                onOk={() => { onDeleteClickEvent() }}
                onCancel={handleCancel}
                okButtonProps={isError ? { disabled: true } : { disabled: false }}
                cancelButtonProps={{ disabled: false }}
            >
                <div>
                    <p>{id} 유저를 삭제하시겠습니까?</p>
                </div>
                {isError && (<Result status={'500'} title={'500'} subTitle={errorMessage} ></Result>)}
            </Modal>

        </StyledFriendRow >

    )
}