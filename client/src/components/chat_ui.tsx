import React, { useEffect, useState } from 'react';
import { get } from '@/services/http';
import styles from '@/styles/utils.module.scss';
import { geChat } from '@/services/endpoints';
import { type AxiosResponse } from 'axios';
import { ChatStore } from '@/stores/chat_store';
import { observer } from 'mobx-react';
import Image from 'next/image';
import GPTAvatar from './gpt_avatar';
import { useSession } from 'next-auth/react'
type Item = {
  from: string;
  value: string;
};

type ChatResponse = {
  title: string;
  items: Item[];
  avatarUrl: '';
};

export const ChatUI = observer(() => {
  const [chat, setChat] = useState<ChatResponse>({ items: [], title: '', avatarUrl: '' });
  const {data} = useSession();
  console.log(data)
  useEffect(() => {
    if(ChatStore.activeChatId !== 0) {
      (async () => {
        const chat: AxiosResponse<ChatResponse> = await get(
          geChat(ChatStore.activeChatId)
        );
        setChat(chat.data);
      })();
    }
  }, [ChatStore.activeChatId]);

  useEffect(() => {
    console.log(chat);
  }, [chat]);
  return (
    <div className="flex flex-col items-center pb-24 dark:bg-[#343541] min-h-screen">
      {chat.items &&
        chat.items.map((item: Item, idx) => {
          return (
            <div
              id={idx.toString()}
              key={item.value}
              className={`relative dark:bg-[#343541] text-gray-700 w-full border-b dark:border-gray-700 border-gray-200 ${item.from === 'gpt' ? 'bg-gray-100 dark:bg-[#434654]' : ''
                }`}
            >
              <div className="relative mx-auto max-w-screen-xl dark:text-gray-100 text-gray-700 w-full px-4 py-10">
                <div className="w-full max-w-screen-md flex flex-1 mx-auto gap-[1.5rem] leading-[1.75] whitespace-pre-wrap">
                {item.from === "human" ? (
                  <Image
                    className="mr-2 rounded-sm h-[28px]"
                    alt="Avatar of the person chatting"
                    width="28"
                    height="28"
                    src='https://abc.xyz/favicon-194x194.png'
                  />
                ) : (
                  <GPTAvatar model={'GPT-3'} />
                )}
                  <div className="flex flex-col">
                    {item.from === 'human' ? (
                      <p className="pb-2 whitespace-prewrap">{item.value}</p>
                    ) : (
                      <div
                        className={styles.response}
                        dangerouslySetInnerHTML={{ __html: item.value }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
});
