import Image from "next/image";
import Head from "next/head";
import { SWRConfig } from 'swr'
import Article from '../components/Article'

function serialize(useSWRNext) {
  return (key, fetcher, config) => {
    const serializedKey = Array.isArray(key) ? JSON.stringify(key) : key

    console.log('serializedKey', serializedKey)

    return useSWRNext(serializedKey, (k) => fetcher(...JSON.parse(k)), config)
  }
}

function HomePage({ fallback }) {
  return (
    <div>
      <Head>
        <title>index</title>
      </Head>
      <SWRConfig value={{ fallback, use: [serialize] }}>
        <Article />
      </SWRConfig>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/1`);
  const data = await res.json();

  // Pass data to the page via props
  return {
    props: {
      fallback: {
        '/todos/1': data
      }
    }
  };
}

export default HomePage;
