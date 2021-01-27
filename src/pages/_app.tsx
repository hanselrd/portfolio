import "@/styles/globals.css";
import Footer from "@/containers/Footer";
import Header from "@/containers/Header";
import { DEV, NEXT_PUBLIC_URL } from "@/core/environment";
import { useStoreActions } from "@/core/store";
import withProviders from "@/hocs/providers";
import _ from "lodash";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const App: React.FC<AppProps> = (props) => {
  const router = useRouter();
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
        dangerouslySetAllPagesToNoIndex={DEV}
        dangerouslySetAllPagesToNoFollow={DEV}
        title="Hansel De La Cruz"
        description="Hansel De La Cruz"
        canonical={`${NEXT_PUBLIC_URL}${
          router.locale && router.locale !== router.defaultLocale ? `/${router.locale}` : ""
        }${router.asPath !== "/" ? router.asPath : ""}`}
        mobileAlternate={{
          media: "only screen and (max-width: 640px)",
          href: `${NEXT_PUBLIC_URL}${
            router.locale && router.locale !== router.defaultLocale ? `/${router.locale}` : ""
          }${router.asPath !== "/" ? router.asPath : ""}`,
        }}
        languageAlternates={_.flattenDeep([
          router.locales!.map((locale) => ({
            hrefLang: locale,
            href: `${NEXT_PUBLIC_URL}${locale !== router.defaultLocale ? `/${locale}` : ""}${
              router.asPath !== "/" ? router.asPath : ""
            }`,
          })),
          {
            hrefLang: "x-default",
            href: `${NEXT_PUBLIC_URL}${router.asPath !== "/" ? router.asPath : ""}`,
          },
        ])}
        openGraph={{
          type: "website",
          url: `${NEXT_PUBLIC_URL}${
            router.locale && router.locale !== router.defaultLocale ? `/${router.locale}` : ""
          }${router.asPath !== "/" ? router.asPath : ""}`,
          title: "Hansel De La Cruz",
          description: "Hansel De La Cruz",
          site_name: "Hansel De La Cruz",
          images: [
            {
              url: `${NEXT_PUBLIC_URL}/logo-ogimage.png`,
              width: 1200,
              height: 630,
              alt: "Logo",
            },
          ],
        }}
      />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="container flex-1 mt-20 mx-auto p-6 break-all">
          <props.Component {...props.pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default withProviders(App);
