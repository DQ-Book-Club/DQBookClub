import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { FirebaseAppProvider } from 'reactfire';
import AuthGuard from '../components/AuthGuard';
import FirebaseProviders from '../components/FirebaseProviders';
import NavigationBar from '../components/nav/NavigationBar';
import '../styles/index.css'
import '../styles/results.css'

const firebaseConfig = {
  apiKey: "AIzaSyCy7sbXnjCwYv3Nl_oLRX_VCHCJQqhURs0",
  authDomain: "dq-book-club.firebaseapp.com",
  projectId: "dq-book-club",
  storageBucket: "dq-book-club.appspot.com",
  messagingSenderId: "913597315006",
  appId: "1:913597315006:web:64b36eed5e1cc5eba7abef",
  measurementId: "G-1DF5TZ1B21"
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet='UTF-8' />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="svg" href="./book.svg" />
        <title>DQ Book Club</title>
      </Head>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <FirebaseProviders>
          <AuthGuard>
            <NavigationBar />
            <main>
              <Component {...pageProps} />
            </main>
          </AuthGuard>
        </FirebaseProviders>
      </FirebaseAppProvider>
    </>
  )
}