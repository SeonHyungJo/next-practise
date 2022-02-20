import Head from "next/head";
import { SWRConfig } from 'swr'
import {useRouter} from "next/router";
import Article from '../components/Article'

function serialize(useSWRNext) {
  return (key, fetcher, config) => {
    const serializedKey = Array.isArray(key) ? JSON.stringify(key) : key

    console.log('serializedKey', serializedKey)

    return useSWRNext(serializedKey, (k) => fetcher(...JSON.parse(k)), config)
  }
}

function AboutPage({ fallback }) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>index</title>
      </Head>
      <SWRConfig value={{ fallback, use: [serialize] }}>
        <button onClick={() => router.push('/')}>{'홈으로 이동하기'}</button>
        <Article/>
      </SWRConfig>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/2`);
  const data = await res.json();

  // Pass data to the page via props
  return {
    props: {
      fallback: {
        '/todos/2': data
      }
    }
  };
}

export default AboutPage;
