import "@/styles/globals.css";
import { useStoreActions } from "@/core/store";
import withProviders from "@/hocs/providers";
import { AppProps } from "next/app";
import React, { useEffect } from "react";

const App: React.FC<AppProps> = (props) => {
  const themeStart = useStoreActions((actions) => actions.theme.start);

  useEffect(() => {
    themeStart();
  }, [themeStart]);

  return (
    <div className="h-screen bg-gray-100 font-poppins dark dark:bg-gray-900 dark:text-white">
      <props.Component {...props.pageProps}></props.Component>
    </div>
  );
};

export default withProviders(App);
