import { Flex } from "antd";
import { ReactNode } from "react";

type Props = { children: ReactNode }


export default function TextLayout({ children }: Props) {
    return (
        <Flex gap="middle" vertical>
            <p>text 관련이에요</p>
            {children}
        </Flex>
    )
}