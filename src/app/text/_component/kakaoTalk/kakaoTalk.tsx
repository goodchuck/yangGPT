import { UserTypes } from '@/types/user/types';
import style from './kakao.module.css';
import { AssistantMessage, GPTTextRequest, SystemMessage, UserMessage } from '@/types/GPT/type';
import { useEffect, useRef } from 'react';
import { Spin } from 'antd';
// import icon from '/public/icons/user/user.svg';

type Props = {
    user?: UserTypes,
    assistant?: UserTypes,
    data?: GPTTextRequest,
    isLoading?: boolean
}

/**
 * 카카오톡 채팅창 
 * 일단 1:1 채팅으로 만듬
 * @returns 
 */
export const KakaoTalkChatRoom = ({ data, user, assistant, isLoading = false }: Props) => {
    let testRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        testRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [data, user, assistant, isLoading])

    return (
        <div className={style.wrap}>
            {data?.messages.map((row, i) => (<Chats key={i} row={row} user={user} assistant={assistant}></Chats>))}
            {isLoading && assistant && <LoadingComponent assistant={assistant} />}
            <div ref={testRef} />
        </div>
    )
}

type ChatProps = {
    row: SystemMessage | UserMessage | AssistantMessage,
    user?: UserTypes,
    assistant?: UserTypes,
}

export const Chats = ({ row, user, assistant }: ChatProps) => {
    if (row.role === 'system') return;
    let isCh1 = row.role === 'user' ? false : true
    return (
        <>
            {isCh1 && (
                <div className={`${style.chat} ${style.ch1}`}>
                    <div className={style.icon}>
                        <i className={`${style['fa-solid']} ${style['fa-user']}`}>
                            <img src={assistant?.image} alt='아이콘' style={{ width: '100%', height: '100%' }} />
                        </i>
                    </div>
                    <div className={style.textContainer}>
                        <p className={style.name}>{assistant?.nickname}</p>
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
                            <img src={user?.image} alt='아이콘' style={{ width: '100%', height: '100%' }} />
                        </i>
                    </div>
                    <div className={style.textbox}>{row.content}</div>
                </div>
            )}
        </>
    )
}

type LoadingProps = {
    assistant: UserTypes
}
export const LoadingComponent = ({ assistant }: LoadingProps) => {
    return (
        <>
            <div className={`${style.chat} ${style.ch1}`}>
                <div className={style.icon}>
                    <i className={`${style['fa-solid']} ${style['fa-user']}`}>
                        <img src={assistant?.image} alt='아이콘' style={{ width: '100%', height: '100%' }} />
                    </i>
                </div>
                <div className={style.textContainer}>
                    <p className={style.name}>{assistant?.nickname}</p>
                    <div className={style.textbox}>
                        <Spin />
                    </div>
                </div>
            </div>
        </>
    )
}