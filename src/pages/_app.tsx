import React from 'react';
import type {AppProps} from 'next/app';
import '../globals.css';
import '../styles/highlight.less';

export default function App({Component, pageProps}: AppProps) {
  return <Component {...pageProps} />;
}
