import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { Person } from "@/Portfolio.Person";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="tap-highlight-none">
        <h2 className={inter.className}>
          Docs <span>-&gt;</span>
        </h2>
        <p className="underline">Hello world!</p>
        <p className="text-3xl portrait:underline">portrait</p>
        <p className="text-3xl landscape:underline">landscape</p>
        <p className={inter.className}>
          Find in-depth information about Next.js features and&nbsp;API.
        </p>
        <p>Person: {Person(2)}</p>
      </main>
    </>
  );
}
