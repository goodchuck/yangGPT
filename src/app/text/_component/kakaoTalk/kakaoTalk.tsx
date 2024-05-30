'use client';

import { UserTypes } from '@/types/user/types';
import {
  AssistantMessage,
  GPTTextRequest,
  SystemMessage,
  UserMessage,
} from '@/types/GPT/type';
import { useEffect, useRef, forwardRef } from 'react';
import { Spin } from 'antd';
import { dataTagSymbol, useQueries, useQuery } from '@tanstack/react-query';
import { getUser } from '@/app/api/user/userAPI';
import { chatRoomTypes } from '@/types/chatRoom/type';
import style from './kakao.module.css';
// import icon from '/public/icons/user/user.svg';

type Props = {
  user?: UserTypes;
  // assistant?: UserTypes,
  data?: chatRoomTypes;
  isLoading?: boolean;
};

/**
 * 카카오톡 채팅창
 * 일단 1:1 채팅으로 만듬
 * @returns
 */
export const KakaoTalkChatRoom = forwardRef<HTMLDivElement, Props>(
  ({ data, isLoading = false }, ref) => {
    // let testRef = useRef<HTMLDivElement | null>(null);

    // useQuries
    const userQuries = useQueries({
      queries: [
        {
          queryKey: ['getUser', String(data?.user_id)],
          queryFn: getUser,
        },
        {
          queryKey: ['getUser', String(1)],
          queryFn: getUser,
        },
      ],
    });

    const assistant = userQuries[0];
    const me = userQuries[1];

    useEffect(() => {
      if (data && !(assistant.isLoading || me.isLoading)) {
        // @ts-ignore
        ref?.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }, [data, assistant.isLoading, me.isLoading]);

    if (assistant.isLoading || me.isLoading) {
      return (
        <div className={style.wrap}>
          {isLoading && (
            <LoadingComponent assistant={assistant.data.results[0]} />
          )}
        </div>
      );
    }

    return (
      <div className={style.wrap}>
        {data?.messages.map((row, i) => (
          <Chats
            key={i}
            row={row}
            me={me.data.results[0]}
            assistant={assistant.data.results[0]}
          />
        ))}
        {isLoading && (
          <LoadingComponent assistant={assistant.data.results[0]} />
        )}
        <div ref={ref} />
      </div>
    );
  },
);
KakaoTalkChatRoom.displayName = 'KakaoTalkChatRoom';
type ChatProps = {
  row: SystemMessage | UserMessage | AssistantMessage;
  me?: UserTypes;
  assistant?: UserTypes;
};

export function Chats({ row, me, assistant }: ChatProps) {
  if (row.role === 'system') return;
  const isCh1 = row.role !== 'user';
  return (
    <>
      {isCh1 && (
        <div className={`${style.chat} ${style.ch1}`}>
          <div className={style.icon}>
            <i className={`${style['fa-solid']} ${style['fa-user']}`}>
              <img
                src={`/icons/user/${assistant?.id}1.PNG`}
                alt="아이콘"
                style={{ width: '100%', height: '100%' }}
              />
            </i>
          </div>
          <div className={style.textContainer}>
            <p className={style.name}>{assistant?.username}</p>
            <div className={style.textbox}>{row.content}</div>
          </div>
        </div>
      )}
      {!isCh1 && (
        <div className={`${style.chat} ${style.ch2}`}>
          <div className={style.icon}>
            <i className={`${style['fa-solid']} ${style['fa-user']}`}>
              <img
                src={`/icons/user/${me?.id}1.svg`}
                alt="아이콘"
                style={{ width: '100%', height: '100%' }}
              />
            </i>
          </div>
          <div className={style.textbox}>{row.content}</div>
        </div>
      )}
    </>
  );
}

type LoadingProps = {
  assistant: UserTypes;
};
export function LoadingComponent({ assistant }: LoadingProps) {
  return (
    <div className={`${style.chat} ${style.ch1}`}>
      <div className={style.icon}>
        <i className={`${style['fa-solid']} ${style['fa-user']}`}>
          <img
            src={`/icons/user/${assistant?.id}1.PNG`}
            alt="아이콘"
            style={{ width: '100%', height: '100%' }}
          />
        </i>
      </div>
      <div className={style.textContainer}>
        <p className={style.name}>{assistant?.username}</p>
        <div className={style.textbox}>
          <Spin />
        </div>
      </div>
    </div>
  );
}
