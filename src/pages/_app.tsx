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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
          router.locale && router.locale !== router.defaultLocale
            ? `/${router.locale.toLowerCase()}`
            : ""
        }${router.asPath !== "/" ? router.asPath : ""}`}
        mobileAlternate={{
          media: "only screen and (max-width: 640px)",
          href: `${NEXT_PUBLIC_URL}${
            router.locale && router.locale !== router.defaultLocale
              ? `/${router.locale.toLowerCase()}`
              : ""
          }${router.asPath !== "/" ? router.asPath : ""}`
        }}
        languageAlternates={_.flattenDeep([
          router.locales!.map((locale) => ({
            hrefLang:
              router
                .locales!.filter((value) => value.split("-")[0] === locale.split("-")[0])
                .indexOf(locale) === 0
                ? locale.split("-")[0]
                : locale.toLowerCase(),
            href: `${NEXT_PUBLIC_URL}${
              locale !== router.defaultLocale ? `/${locale.toLowerCase()}` : ""
            }${router.asPath !== "/" ? router.asPath : ""}`
          })),
          {
            hrefLang: "x-default",
            href: `${NEXT_PUBLIC_URL}${router.asPath !== "/" ? router.asPath : ""}`
          }
        ])}
        openGraph={{
          type: "website",
          url: `${NEXT_PUBLIC_URL}${
            router.locale && router.locale !== router.defaultLocale
              ? `/${router.locale.toLowerCase()}`
              : ""
          }${router.asPath !== "/" ? router.asPath : ""}`,
          title: "Hansel De La Cruz",
          description: "Hansel De La Cruz",
          site_name: "Hansel De La Cruz",
          locale: router.locale?.replace("-", "_"),
          images: [
            {
              url: `${NEXT_PUBLIC_URL}/logo-ogimage.png`,
              width: 1200,
              height: 630,
              alt: "Logo"
            }
          ]
        }}
      />
      {DEV && (
        <div className="bg-gray-700 rounded-full flex items-center justify-center h-6 text-xs m-8 p-3 fixed bottom-0 left-0 text-white w-6 z-50 xs:bg-red-700 sm:bg-yellow-700 md:bg-green-700 lg:bg-blue-700 xl:bg-indigo-700 2xl:bg-purple-700">
          <div className="block xs:hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden">
            al
          </div>
          <div className="hidden xs:block sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden">
            xs
          </div>
          <div className="hidden xs:hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
            sm
          </div>
          <div className="hidden xs:hidden sm:hidden md:block lg:hidden xl:hidden 2xl:hidden">
            md
          </div>
          <div className="hidden xs:hidden sm:hidden md:hidden lg:block xl:hidden 2xl:hidden">
            lg
          </div>
          <div className="hidden xs:hidden sm:hidden md:hidden lg:hidden xl:block 2xl:hidden">
            xl
          </div>
          <div className="hidden xs:hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:block">
            2xl
          </div>
        </div>
      )}
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
