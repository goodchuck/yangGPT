import { Flex } from "antd";
import { Header } from "../../_component/Header";
import { MainContainer } from "./_component/MainContainer";
import { FriendRow } from "./_component/FriendRow";
type Props = {
    params: { username: string }
}

export async function generateMetadata({ params }: Props) {
    return {
        title: `AI 여자친구`,
        description: `프로필`
    }
}

export default function Page() {
    return (
        <Flex vertical>
            <Header></Header>
            <MainContainer>
                <div>내 프로필 영역</div>
                <div className={"division"}></div>
                <div className='friends'>
                    <p>친구 06명</p>
                    <ul>
                        <FriendRow></FriendRow>
                        <FriendRow></FriendRow>
                        <FriendRow></FriendRow>
                        <FriendRow></FriendRow>
                        <FriendRow></FriendRow>
                        <FriendRow></FriendRow>
                    </ul>
                </div>


            </MainContainer>
        </Flex>
    )
}

