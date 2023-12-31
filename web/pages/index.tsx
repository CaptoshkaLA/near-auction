/*import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import styles from '../styles/Home.module.css';
import Auction from '../components/Auction';
import { listAuctions } from '../near';

const Home: NextPage = ({ near }: any) => {
  const [auctions, setAuctions] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(false);

  console.log('PAGE', near);

  useEffect(() => {
    if (near) {
      setLoading(true);
      listAuctions().then((response: any) => {
        setLoading(false);
        console.log(response);
        setAuctions(response);
      });
    }
  }, [near]);

  return (
    <>
      <Head>
        <title>Blockchain auction</title>
        <meta name="description" content="Blockchain auction" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Auctions</h1>
        <Grid container spacing={2}>
          {auctions.map((auction, index) => (
            <Grid key={index} item xs={6}>
              <Auction auction={auction} index={index} />
            </Grid>
          ))}
        </Grid>
      </main>

      <footer className={styles.footer}>Created by Anton Lisovskiy</footer>
    </>
  );
};

export default Home;*/

import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import styles from '../styles/Home.module.css';
import AuctionOpen from '../components/AuctionOpen';
import { listAuctions } from '../near';

const Home: NextPage = ({ near }: any) => {
  const [auctions, setAuctions] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(false);

  console.log('PAGE', near);

  useEffect(() => {
    if (near) {
      setLoading(true);
      listAuctions().then((response: any) => {
        setLoading(false);
        console.log(response);
        setAuctions(response);
      });
    }
  }, [near]);

  return (
    <>
      <Head>
        <title>Блокчейн аукцион</title>
        <meta name="description" content="Blockchain auction" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Список открытых лотов</h1>
        {/*<Grid container spacing={1}>*/}
        {/*  {auctions.map((auction, index) => (*/}
        {/*    <Grid key={index} item xs={6}>*/}
        {/*      <AuctionOpen auction={auction} index={index} />*/}
        {/*    </Grid>*/}
        {/*  ))}*/}
        {/*</Grid>*/}
        <div style={{width:"100%", display:"flex", justifyContent:"space-between"}}>
          {auctions.map((auction, index) => (
            !(auction.canceled || auction.ended) &&
            <div key={index}>
              <AuctionOpen auction={auction} index={index} />
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>Created by Anton Lisovskiy</footer>
    </>
  );
};

export default Home;

