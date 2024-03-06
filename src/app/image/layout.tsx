// image관련

import { Flex } from "antd";
import { ReactNode } from "react";
type Props = { children: ReactNode };
export default function ImageLayout({ children }: Props) {
    return (
        <Flex gap='middle' vertical>
            <p>이미지 관련이에요</p>
            {children}
        </Flex>
    )
}