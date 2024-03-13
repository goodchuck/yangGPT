import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: 'assistant',
    description: 'assistant'
}

export default function AssistantLayout({
    children
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <p>assistant</p>
            {children}
        </>
    )
}