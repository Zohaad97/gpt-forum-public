import {UserView} from '@/layouts/user_view';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Ultimate GPT Forum</title>
      </Head>
      <UserView />
    </>
  );
}

Home.requireAuth = true;