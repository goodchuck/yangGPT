import { MenuSideBar } from "../_component/MenuSideBar";


export default function GirlFriendLayout(
    { children }: { children: React.ReactNode }
) {
    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            {/* <p>현재 페이지 : {currentUrl}</p> */}
            <MenuSideBar></MenuSideBar>
            {children}
        </div>
    )
}