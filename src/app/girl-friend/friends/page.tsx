import { Flex } from "antd";
import { Header } from "../_component/Header";
import { MainContainer } from "./_component/MainContainer";


export default function Page() {
    return (
        <Flex vertical>
            <Header></Header>
            <MainContainer>
                <div>내 프로필 영역</div>
                <div className={"division"}></div>
                <div className='friends'>
                    <p>친구 02명</p>
                    <ul>
                        <FriendRow></FriendRow>
                        <FriendRow></FriendRow>
                    </ul>
                </div>


            </MainContainer>
        </Flex>
    )
}

/**
 * 카카오톡 친구 하나당 행
 * @returns 
 */
const FriendRow = () => {
    return (
        <li>
            <div>
                <img
                    src={'/icons/user/카리나1.PNG'}
                    alt="profile Image"
                //   onClick={profileImgClick}
                />
                <div>
                    <p>
                        <b>{'카리나'}</b>
                    </p>
                    <p>{'에스파 소속이에요!'}</p>
                </div>

            </div>

        </li>
    )
}