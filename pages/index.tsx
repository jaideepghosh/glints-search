import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import Restaurants from '../components/Restaurants'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Glints - Restaurant Search Engine</title>
        <meta name="description" content="Glints project to search restaurants for a given time frame." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>
      <main className={styles.main}>
        <Restaurants/>
      </main>

      <footer className={styles.footer}>
          Project by&nbsp;
          <a
            href="https://jaideep.xyz"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jaideep Ghosh
          </a>
      </footer>
    </div>
  )
}

export default Home
