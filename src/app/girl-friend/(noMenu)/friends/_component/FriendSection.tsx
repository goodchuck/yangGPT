"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FriendRow } from "./FriendRow"
import { createUser, getFriends, updateUser } from "@/app/api/user/userAPI";
import { UserTypes } from "@/types/user/types";
import { Button, Spin } from "antd";
import { useEffect, useState } from "react";
import { UserUpdateModal } from "@/app/girl-friend/_component/UserUpdateModal";


export const FriendSection = () => {
    const [isOpenUserUpdateModal, setIsOpenUserUpdateModal] = useState<boolean>(false);
    const [targetUser, setTargetUser] = useState<number>(0);
    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery({
        queryKey: ['getFriends', 'test'],
        queryFn: getFriends
    })
    const [filteredData, setFilteredData] = useState<UserTypes[]>([]);

    const mutation = useMutation({
        mutationFn: async (e: any) => {
            return createUser(e)
        },
        async onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['getFriends', 'test'] });
        }
    })


    useEffect(() => {
        if (data && data.isSuccess) {
            const filteredFriends = data.results.filter((row: UserTypes) => row.user_id > 1);
            setFilteredData(filteredFriends);
        }
    }, [data])

    return (
        <div className='friends'>
            {isLoading ? (
                <Spin />
            ) : (
                <>
                    <p>친구 {String(filteredData?.length).padStart(2, '0')}명</p>
                    <Button onClick={() => {
                        mutation.mutate({ userId: '테스트3', userName: '테스트3', eMail: 'test3@naver.com', passWord: 'test123' });
                    }}>친구 생성</Button>
                    <Button onClick={() => {
                        setIsOpenUserUpdateModal(true)
                    }}>친구 정보 바꾸기</Button>
                    <ul>
                        {data.isSuccess && filteredData?.map((row: UserTypes, i: number) => (
                            <FriendRow key={i} User={row} targetUser={targetUser} setTargetUser={setTargetUser}></FriendRow>
                        ))}
                    </ul>
                    <UserUpdateModal open={isOpenUserUpdateModal} setOpen={setIsOpenUserUpdateModal} targetUser={targetUser} />
                </>

            )}

        </div>
    )
}