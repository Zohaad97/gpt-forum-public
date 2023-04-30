import React from 'react';
import {get} from '@/services/http';
import styles from '@/styles/utils.module.scss';
import Image from 'next/image';
import GPTAvatar from './gpt_avatar';
import {Conversation} from '@/types/conversation.type';

type Item = {
  from: string;
  value: string;
};

type ChatResponse = {
  title: string;
  items: Item[];
  avatarUrl: '';
};

export const ChatUI: React.FC<{chat: Conversation}> = ({chat}) => {
  // useEffect(() => {
  //   if (ChatStore.activeChatId !== 0) {
  //     (async () => {
  //       const chat: AxiosResponse<ChatResponse> = await get(
  //         geChat(ChatStore.activeChatId)
  //       );
  //       setChat(chat.data);
  //     })();
  //   }
  // }, [ChatStore.activeChatId]);

  // useEffect(() => {
  //   console.log(chat);
  // }, [chat]);
  return (
    <div className="flex flex-col items-center dark:bg-[#343541] min-h-screen">
      {chat.items &&
        chat.items.map((item: Item, idx) => {
          return (
            <div
              id={idx.toString()}
              key={item.value}
              className={`relative dark:bg-[#343541] text-gray-700 w-full border-b dark:border-gray-700 border-gray-200 ${
                item.from === 'gpt' ? 'bg-gray-100 dark:bg-[#434654]' : ''
              }`}
            >
              <div className="relative mx-auto max-w-screen-xl dark:text-gray-100 text-gray-700 w-full px-4 py-10">
                <div className="w-full max-w-screen-md flex flex-1 mx-auto gap-[1.5rem] leading-[1.75] whitespace-pre-wrap">
                  {item.from === 'human' ? (
                    <Image
                      className="mr-2 rounded-sm h-[28px]"
                      alt="Avatar of the person chatting"
                      width="28"
                      height="28"
                      src="https://abc.xyz/favicon-194x194.png"
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
                        dangerouslySetInnerHTML={{__html: item.value}}
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
};
