import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

function HomePage({ data }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>{router.query.id}</title>
      </Head>
      Welcome to Next.js!
    </div>
  );
}

// This function gets called at build time
// export async function getStaticPaths() {
//   return {
//     // Only `/posts/1` and `/posts/2` are generated at build time
//     paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
//     // Enable statically generating additional pages
//     // For example: `/posts/3`
//     fallback: true,
//   };
// }

export async function getServerSideProps(context) {
  // Fetch data from external API
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
  const data = await res.json();

  // Pass data to the page via props
  // return {
  //   redirect: {
  //     destination: "/",
  //     permanent: false,
  //   },
  // };

  return { props: { data } };
}

export default HomePage;
