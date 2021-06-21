import Image from "next/image";
import Head from "next/head";
import { useEffect } from "react";

function HomePage({ data }) {
  return (
    <div>
      <Head>
        <title>index</title>
      </Head>
      <Image
        src={"https://static.zaritalk.com/images/img-king-sejong@3x.png"}
        alt="Picture of the author"
        width={500}
        height={500}
        // blurDataURL="data:..." automatically provided
        // Optionally allows to add a blurred version of the image while loading
        // placeholder="blur"
      />
      Welcome to Next.js!
    </div>
  );
}

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default HomePage;
