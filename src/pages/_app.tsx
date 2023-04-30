import { SessionProvider } from "next-auth/react";
import type { AppProps } from 'next/app';
import '../globals.scss';
import '../styles/highlight.scss';
// import { ProtectedLayout } from "@/layouts/protected-layout";


type AppPropsWithAuth = AppProps & {
  Component: {
    requireAuth?: boolean;
  };
};


export default function App({ Component, pageProps }: AppPropsWithAuth) {
  return <SessionProvider session={pageProps.session}>
    <Component {...pageProps} />
  </SessionProvider>;
}