import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ClerkProvider } from "@clerk/clerk-react";
import { useRouter } from "next/router";
import Header from '../components/Header'

const clerkFrontendApi = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <ClerkProvider
      frontendApi={clerkFrontendApi}
      navigate={(to) => router.push(to)}
    >
      {/* header start */}
      <Head>
        <title>Glints - Restaurant Search Engine</title>
        <meta name="description" content="Glints project to search restaurants for a given time frame." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      {/* header end */}
      
      {/* main body start */}
      <main>
        <Component {...pageProps} />
      </main>
      {/* main body end */}

      {/* footer start */}
      <footer className='footer'>
          Project by&nbsp;
          <a
            href="https://jaideep.xyz"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jaideep Ghosh
          </a>
      </footer>
      {/* footer end */}
    </ClerkProvider>
  );
}

export default MyApp
