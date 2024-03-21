
import { Flex } from "antd";
import { Header } from "../../_component/Header";
import { MainContainer } from "./_component/MainContainer";
import { FriendSection } from "./_component/FriendSection";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getFriends } from "@/app/api/user/userAPI";
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
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['getFriends', 'test'],
        queryFn: getFriends,
    })
    const dehydratedState = dehydrate(queryClient);
    return (
        <Flex vertical>
            <HydrationBoundary state={dehydratedState}>
                <MainContainer>
                    <div>내 프로필 영역</div>
                    <div className={"division"}></div>
                    <FriendSection />


                </MainContainer>
            </HydrationBoundary>
            {/* <Header></Header> */}
        </Flex>
    )
}

