import "@/styles/globals.css";
import Header from "@/containers/Header";
import { useStoreActions } from "@/core/store";
import withProviders from "@/hocs/providers";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import React, { useEffect } from "react";

const App: React.FC<AppProps> = (props) => {
  const themeStart = useStoreActions((actions) => actions.theme.start);

  useEffect(() => {
    // themeStart();
  }, [themeStart]);

  return (
    <>
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
