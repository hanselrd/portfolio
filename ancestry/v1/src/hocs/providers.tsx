import store from "@/core/store";
import { StoreProvider } from "easy-peasy";
import { I18nProps, I18nProvider } from "next-rosetta";
import { AppProps } from "next/app";
import React from "react";

const withProviders = <P extends AppProps>(Component: React.ComponentType<P>): React.FC<P> => {
  const WithProviders: React.FC<P> = (props) => {
    return (
      <>
        <StoreProvider store={store}>
          <I18nProvider table={(props.pageProps as I18nProps).table}>
            <Component {...props} />
          </I18nProvider>
        </StoreProvider>
      </>
    );
  };
  return WithProviders;
};

export default withProviders;
