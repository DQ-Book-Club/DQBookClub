import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { FirebaseAppProvider } from 'reactfire';
import AuthGuard from '../components/AuthGuard';
import FirebaseProviders from '../components/FirebaseProviders';
import NavigationBar from '../components/nav/NavigationBar';
import '../styles/index.css'
import '../styles/results.css'
import 'yet-another-react-lightbox/styles.css'

const firebaseConfig = {
  apiKey: "AIzaSyCy7sbXnjCwYv3Nl_oLRX_VCHCJQqhURs0",
  authDomain: "dq-book-club.firebaseapp.com",
  projectId: "dq-book-club",
  storageBucket: "dq-book-club.appspot.com",
  messagingSenderId: "913597315006",
  appId: "1:913597315006:web:c449d0892b9b731ea7abef",
  measurementId: "G-3ZVZ2QLFHT"
};


export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet='UTF-8' />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png"></link>
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