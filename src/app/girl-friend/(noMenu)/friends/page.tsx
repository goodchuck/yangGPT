
import { Flex } from "antd";
import { Header } from "../../_component/Header";
import { MainContainer } from "./_component/MainContainer";
import { FriendSection } from "./_component/FriendSection";
type Props = {
    params: { username: string }
}

export async function generateMetadata({ params }: Props) {
    return {
        title: `AI 여자친구`,
        description: `프로필`
    }
}

export default async function Page() {
    return (
        <Flex vertical>
            <Header></Header>
            <MainContainer>
                <div>내 프로필 영역</div>
                <div className={"division"}></div>
                <FriendSection />


            </MainContainer>
        </Flex>
    )
}

