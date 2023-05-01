import React from 'react';
import {type GetServerSideProps} from 'next';
import Head from 'next/head';
import {fetchConveration} from '@/models/conversation';
import {type Conversation} from '@/types/conversation.type';
import {Layout} from 'antd';
import {MainContent} from '@/components/main_content';
import {ResponsiveGrid} from '@/components/responsive_grid';
import {ChatUI} from '@/components/chat_ui';
import {type ParsedUrlQuery} from 'querystring';
import {SelectFolder} from '@/layouts/select_folder';
//import {useSession} from 'next-auth/react';

export default function Page({chat}: {chat: Conversation}) {
  //   const {data} = useSession();
  return (
    <>
      <Head>
        <title>Ultimate GPT Forum</title>
      </Head>
      <Layout className="site-layout">
        <MainContent>
          <ResponsiveGrid
            cols={[
              {
                size: {sm: 24, md: 24, lg: 24, xl: 24, xxl: 24},
                component: <ChatUI chat={chat} />,
              },
            ]}
          />
        </MainContent>
      </Layout>
      <SelectFolder chat={chat} userId={null} />
    </>
  );
}

interface ChatParams extends ParsedUrlQuery {
  id: string;
  option: string;
}

type PageProps = {
  chat: Conversation;
  option: string;
};

export const getServerSideProps: GetServerSideProps<PageProps> = async context => {
  const query = context.query as ChatParams;
  const chat = await fetchConveration(query.id);
  // TODO: Need to put validation. If chat is not public it should return 404
  return {
    props: {
      chat: chat,
      option: query.option,
    },
  };
};
