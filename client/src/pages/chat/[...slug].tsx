import { UserView } from '@/layouts/user_view';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { fetchAllConverationFolder } from '@/models/conversation';
import { getSession } from 'next-auth/react';

export default function Chat() {
  return (
    <>
      <Head>
        <title>Ultimate GPT Forum</title>
      </Head>
      <UserView />
    </>
  );
}

Chat.requireAuth = true;

type Folder = {
  id: number,
  name: string,
  conversations: []
}

export const getServerSideProps: GetServerSideProps<{ folders: Folder[] }> = async ({ req }) => {
  const session = await getSession({ req });
  // @ts-ignore
  const data: Folder[] = await fetchAllConverationFolder(session?.user?.id);

  return {
    props: {
      folders: data
    },
  };
};
