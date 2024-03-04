import { MenuSideBar } from "./_component/MenuSideBar";
// import styled from "styled-components";
// const StyledGirlFriendLayout = styled.div`
//     display:flex;
//     gap:10px;    
// `

export default function GirlFriendLayout(
    { children }: { children: React.ReactNode }
) {
    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            <MenuSideBar></MenuSideBar>
            {children}
        </div>
    )
}