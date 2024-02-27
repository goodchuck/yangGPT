import { MessageLog } from '@/types/global';
import style from './kakao.module.css';
// import icon from '/public/icons/user/user.svg';
type Props = {
    data?: MessageLog[]
}

/**
 * 카카오톡 채팅창 
 * @returns 
 */
export const KakaoTalkChatRoom = ({ data }: Props) => {
    return (
        <div className={style.wrap}>
            {data?.map(row => (<Chats row={row}></Chats>))}
        </div>
    )
}

type ChatProps = {
    row: MessageLog
}

export const Chats = ({ row }: ChatProps) => {
    return (
        <>
            <div className={`${style.chat} ${style.ch2}`}>
                <div className={style.icon}>
                    <i className={`${style['fa-solid']} ${style['fa-user']}`}>
                        <img src='/icons/user/user.svg' alt='아이콘' style={{ width: '100%', height: '100%' }} />
                    </i>
                </div>
                <div className={style.textbox}>{row.question}</div>
            </div>
            <div className={`${style.chat} ${style.ch1}`}>
                <div className={style.icon}>
                    <i className={`${style['fa-solid']} ${style['fa-user']}`}>
                        <img src='/icons/user/카리나1.PNG' alt='아이콘' style={{ width: '100%', height: '100%' }} />
                    </i>
                </div>
                <div className={style.textContainer}>
                    <p className={style.name}>카리나</p>
                    <div className={style.textbox}>

                        {row.answer}
                    </div>
                </div>

            </div>

        </>
    )
}