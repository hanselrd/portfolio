import "@/styles/globals.css";
import Header from "@/containers/Header";
import { useStoreActions } from "@/core/store";
import withProviders from "@/hocs/providers";
import { AppProps } from "next/app";
import React, { useEffect } from "react";

const App: React.FC<AppProps> = (props) => {
  const themeStart = useStoreActions((actions) => actions.theme.start);

  useEffect(() => {
    // themeStart();
  }, [themeStart]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-poppins dark:bg-gray-900 dark:text-white">
      <Header />
      <div className="container flex-1 px-6 mt-24">
        <props.Component {...props.pageProps}></props.Component>
      </div>
      <div>Footer</div>
    </div>
  );
};

export default withProviders(App);
