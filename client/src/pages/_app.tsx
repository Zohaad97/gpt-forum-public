import React from 'react';
import type { AppProps } from 'next/app';
import '../globals.scss';
import '../styles/highlight.scss';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App({ Component, pageProps }: AppProps) {
  return <GoogleOAuthProvider clientId="867710713307-9262qp9c32rirk6st5aad08spc00kemv.apps.googleusercontent.com">
    <Component {...pageProps} />
  </GoogleOAuthProvider>
}
