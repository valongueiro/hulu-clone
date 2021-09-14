import Head from "next/head";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Results from "../components/Results";
import requests from "../utils/requests";

export default function Home({ results }) {
  return (
    <div>
      <Head>
        <title>Hulu 2.0 Clone by André Valongueiro</title>
        <meta
          name="description"
          content="Hulu 2.0 Clone by André Valongueiro"
        />
        <link rel="icon" href="https://www.hulu.com/favicon.ico" />
      </Head>
      <Header />
      <Nav />
      <Results results={results} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const genre = context.query.genre;

  const res = await fetch(
    `${apiUrl}${requests[genre]?.url ?? requests.fetchTrending.url}`
  );
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      results: data.results,
    },
  };
}
