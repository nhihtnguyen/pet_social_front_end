import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push('/explore');
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Index</title>
        <meta name='description' content="Pet's Friend" />
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </div>
  );
}
