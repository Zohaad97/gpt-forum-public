import React from 'react';
import {UserView} from '@/layouts/user_view/user_view';
import Head from 'next/head';
export default function Home() {
  return (
    <>
      <Head>
        <title>Ultimate GPT Forum</title>
      </Head>
      {/* Temporary rendered homepage */}
      <UserView chat={null} />
    </>
  );
}

Home.requireAuth = true;
