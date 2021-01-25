import "@/styles/globals.css";
import Header from "@/containers/Header";
import { useStoreActions } from "@/core/store";
import withProviders from "@/hocs/providers";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import Head from "next/head";
import React, { useEffect } from "react";

const App: React.FC<AppProps> = (props) => {
  const themeStart = useStoreActions((actions) => actions.theme.start);

  useEffect(() => {
    // themeStart();
  }, [themeStart]);

  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#333333" />
        <meta name="msapplication-TileColor" content="#333333" />
        <meta name="theme-color" content="#333333" />
      </Head>
      <DefaultSeo
        title="Hansel De La Cruz"
        description="Hansel De La Cruz's Portfolio"
        canonical={process.env.NEXT_PUBLIC_URL}
        openGraph={{
          type: "website",
          url: process.env.NEXT_PUBLIC_URL,
          title: "Hansel De La Cruz",
          description: "Hansel De La Cruz's Portfolio",
          locale: "en_US",
          site_name: "Hansel De La Cruz",
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_URL!}/logo-ogimage.png`,
              width: 1200,
              height: 630,
              alt: "Logo",
            },
            {
              url: `${process.env.NEXT_PUBLIC_URL!}/logo-transparent-ogimage.png`,
              width: 1200,
              height: 630,
              alt: "Logo Transparent",
            },
          ],
        }}
      />
      <div className="flex flex-col min-h-screen bg-gray-100 font-poppins dark:bg-gray-900 dark:text-white">
        <Header />
        <div className="container flex-1 px-6 mt-24">
          <props.Component {...props.pageProps}></props.Component>
        </div>
        <div>Footer</div>
      </div>
    </>
  );
};

export default withProviders(App);
