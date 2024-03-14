"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AssistantCard } from "./AssistantCard";
import { Flex } from "antd";
import { useEffect } from "react";

export const AssistantList = () => {
    const queryClient = useQueryClient();
    let data: { isSuccess: boolean, results: any[] } | undefined = queryClient.getQueryData(['assistant']);

    useEffect(() => {
        console.log(data, queryClient)
    }, [data])

    return (
        <Flex gap={'middle'} >
            {data && data.results?.map((data, i) => (<AssistantCard key={i} assistant={data} />))}
        </Flex>
    )
}