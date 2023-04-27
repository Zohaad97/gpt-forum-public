import {UserView} from '@/layouts/user_view';
import {geChat, getAllFolders} from '@/services/endpoints';
import {get, post} from '@/services/http';
import axios, {AxiosResponse} from 'axios';
import {GetServerSideProps} from 'next';
import Head from 'next/head';

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

type ChatpProps = {
  name: string;
};

type Item = {
  from: string;
  value: string;
};

type ChatResponse = {
  title: string;
  items: Item[];
  avatarUrl: '';
};

export const getServerSideProps: GetServerSideProps<ChatpProps> = async context => {
  console.log(context.req.cookies);
  const {slug} = context.query;

  //   var chatResponse = await fetch(getAllFolders);
  //   chatResponse = await chatResponse.json();
  var chatResponse = await axios.get(getAllFolders, {withCredentials: true});

  console.log(chatResponse);

  return {
    props: {
      name: '',
    },
  };
};
