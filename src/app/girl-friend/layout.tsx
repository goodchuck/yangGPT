import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"
import { getFriends } from "../api/user/userAPI";
import React from "react";

export default async function girlFirendLayout({
    children
}: {
    children: React.ReactNode
}) {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['getFriends', 'test'],
        queryFn: getFriends
    })
    const dehydratedState = dehydrate(queryClient);
    return (
        <>
            <HydrationBoundary state={dehydratedState}>
                {children}
            </HydrationBoundary>
        </>
    )
}