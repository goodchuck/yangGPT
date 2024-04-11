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
            {data && data.results?.map((assistant, i) => {
                let isPreparing = true;
                if (assistant.id === "asst_K4r7EXhRTQ0JqewkgZGHkZIV") isPreparing = false;
                return (<AssistantCard key={i} assistant={assistant} isPreparing={isPreparing} />)
            })}
        </Flex>
    )
}