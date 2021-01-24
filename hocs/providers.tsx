import store from "@/core/store";
import { StoreProvider } from "easy-peasy";
import React from "react";

const withProviders = <P extends unknown>(Component: React.ComponentType<P>): React.FC<P> => {
  const WithProvidersComponent: React.FC<P> = (props) => {
    return (
      <StoreProvider store={store}>
        <Component {...props}></Component>
      </StoreProvider>
    );
  };
  return WithProvidersComponent;
};

export default withProviders;
