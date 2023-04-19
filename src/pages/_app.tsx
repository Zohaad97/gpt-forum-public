import React from 'react';
import type {AppProps} from 'next/app';
import '../globals.scss';
import '../styles/highlight.scss';

export default function App({Component, pageProps}: AppProps) {
  return <Component {...pageProps} />;
}
