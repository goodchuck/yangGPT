"use client"
import React from "react"
import { StyledMainContainer } from "../../../_styles/MainStyle"

export const MainContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <StyledMainContainer>
            {children}
        </StyledMainContainer>
    )
}