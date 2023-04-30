import { UserView } from '@/layouts/user_view';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { fetchConveration } from '@/models/conversation';
import { Conversation } from '@/types/conversation.type';

export default function Chat({ chat }: { chat: Conversation }) {
  return (
    <>
      <Head>
        <title>Ultimate GPT Forum</title>
      </Head>
      <UserView chat={chat} />
    </>
  );
}

Chat.requireAuth = true;

export const getServerSideProps: GetServerSideProps<{ chat: Conversation | null }> = async (context) => {

  const { slug } = context.query;
  var chatId = "0";
  if (slug?.length) {
    chatId = slug[slug.length - 1]
  }
  const chat = await fetchConveration(chatId);
  return {
    props: {
      chat: chat
    }
  }
};
