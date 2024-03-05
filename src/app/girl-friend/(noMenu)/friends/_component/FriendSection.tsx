"use client";
import { useQuery } from "@tanstack/react-query";
import { FriendRow } from "./FriendRow"
import { getFriends } from "@/app/api/user/userAPI";
import { UserTypes } from "@/types/user/types";


export const FriendSection = () => {
    const { data } = useQuery({
        queryKey: ['getFriends', 'test'],
        queryFn: getFriends
    })

    return (
        <div className='friends'>
            <p>친구 {String(data.results.length).padStart(2, '0')}명</p>
            <ul>
                {data.isSuccess && data.results?.map((row: UserTypes, i: number) => (
                    <FriendRow key={i} User={row}></FriendRow>
                ))}
            </ul>
        </div>
    )
}