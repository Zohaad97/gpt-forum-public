import React from 'react';
import type {AppProps} from 'next/app';
import "../globals.less"
export default function App({Component, pageProps}: AppProps) {
  return <Component {...pageProps} />;
}
