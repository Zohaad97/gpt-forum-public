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
import {getServerSession} from 'next-auth';
import {authOptions, type Session} from '@/pages/api/auth/[...nextauth]';
//import {useSession} from 'next-auth/react';

export default function Page({chat, userId, option}: PageProps) {
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
      {option === 'select-all' ? <SelectFolder chatId={chat.id} userId={userId} /> : null}
    </>
  );
}

interface ChatParams extends ParsedUrlQuery {
  id: string;
  option: 'select-all';
}

type PageProps = {
  chat: Conversation;
  option: 'select-all';
  userId: string;
};

export const getServerSideProps: GetServerSideProps<PageProps> = async context => {
  const query = context.query as ChatParams;
  const session = (await getServerSession(context.req, context.res, authOptions)) as Session;
  const userId = session?.user?.id;
  if (!userId || !query.id || !query.option) {
    return {
      notFound: true,
    };
  }
  let chat;
  try {
    chat = await fetchConveration(query.id, true);
  } catch (_) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      chat: chat,
      option: query.option,
      userId,
    },
  };
};
