// image관련

import { ImageGPT } from "./_component/ImageGPT";
import { ReactNode } from "react";
type Props = { children: ReactNode, modal: ReactNode };
export default function ImageLayout({ children, modal }: Props) {
    return (
        <>
            {children}
        </>
    )
}