"use client";
import { useQuery } from "@tanstack/react-query";
import { FriendRow } from "./FriendRow"
import { getFriends } from "@/app/api/user/userAPI";
import { UserTypes } from "@/types/user/types";
import { Spin } from "antd";
import { useEffect, useState } from "react";


export const FriendSection = () => {

    const { data, isLoading } = useQuery({
        queryKey: ['getFriends', 'test'],
        queryFn: getFriends
    })
    const [filteredData, setFilteredData] = useState<UserTypes[]>([]);

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
                    <ul>
                        {data.isSuccess && filteredData?.map((row: UserTypes, i: number) => (
                            <FriendRow key={i} User={row}></FriendRow>
                        ))}
                    </ul>
                </>

            )}

        </div>
    )
}