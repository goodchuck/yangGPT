
import { TextGPTForBackEnd } from "@/app/text/_component/TextGPTForBackEnd";


type Props = {
    params: { username: string }
}

export async function generateMetadata({ params }: Props) {
    return {
        title: `AI 여자친구`,
        description: `프로필`
    }
}
/**
 * Ai 여자친구의 채팅 창
 * @param param0 
 * @returns 
 */
export default async function Page({ params }: Props) {
    const { username } = params;

    return (
        <>
            {/* {username} 페이지입니다. */}
            <TextGPTForBackEnd user={username}></TextGPTForBackEnd>
        </>
    )
}