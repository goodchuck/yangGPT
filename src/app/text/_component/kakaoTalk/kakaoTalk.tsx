import { MessageLog } from '@/types/global';
import style from './kakao.module.css';
import { AssistantMessage, GPTTextRequest, SystemMessage, UserMessage } from '@/types/GPT/type';
// import icon from '/public/icons/user/user.svg';
type Props = {
    data?: GPTTextRequest
}

/**
 * 카카오톡 채팅창 
 * @returns 
 */
export const KakaoTalkChatRoom = ({ data }: Props) => {
    return (
        <div className={style.wrap}>
            {data?.messages.map(row => (<Chats row={row}></Chats>))}
        </div>
    )
}

type ChatProps = {
    row: SystemMessage | UserMessage | AssistantMessage
}

export const Chats = ({ row }: ChatProps) => {
    if (row.role === 'system') return;
    let isCh1 = row.role === 'user' ? false : true
    return (
        <>
            {isCh1 && (
                <div className={`${style.chat} ${style.ch1}`}>
                    <div className={style.icon}>
                        <i className={`${style['fa-solid']} ${style['fa-user']}`}>
                            <img src='/icons/user/ChatGPT_logo.svg' alt='아이콘' style={{ width: '100%', height: '100%' }} />
                        </i>
                    </div>
                    <div className={style.textContainer}>
                        <p className={style.name}>GPT-3.5</p>
                        <div className={style.textbox}>

                            {row.content}
                        </div>
                    </div>
                </div>
            )}
            {!isCh1 && (
                <div className={`${style.chat} ${style.ch2}`}>
                    <div className={style.icon}>
                        <i className={`${style['fa-solid']} ${style['fa-user']}`}>
                            <img src='/icons/user/user.svg' alt='아이콘' style={{ width: '100%', height: '100%' }} />
                        </i>
                    </div>
                    <div className={style.textbox}>{row.content}</div>
                </div>
            )}



        </>
    )
}