import "@/styles/globals.css";
import Footer from "@/containers/Footer";
import Header from "@/containers/Header";
import { NEXT_PUBLIC_URL } from "@/core/environment";
import { useStoreActions } from "@/core/store";
import withProviders from "@/hocs/providers";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import Head from "next/head";
import React, { useEffect } from "react";

const App: React.FC<AppProps> = (props) => {
  const themeActions = useStoreActions((actions) => actions.theme);

  useEffect(() => {
    themeActions.start();
  }, [themeActions]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
        canonical={NEXT_PUBLIC_URL}
        openGraph={{
          type: "website",
          url: NEXT_PUBLIC_URL,
          title: "Hansel De La Cruz",
          description: "Hansel De La Cruz's Portfolio",
          locale: "en_US",
          site_name: "Hansel De La Cruz",
          images: [
            {
              url: `${NEXT_PUBLIC_URL}/logo-ogimage.png`,
              width: 1200,
              height: 630,
              alt: "Logo",
            },
            {
              url: `${NEXT_PUBLIC_URL}/logo-transparent-ogimage.png`,
              width: 1200,
              height: 630,
              alt: "Logo Transparent",
            },
          ],
        }}
      />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="container flex-1 mt-24 px-6">
          <props.Component {...props.pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default withProviders(App);
