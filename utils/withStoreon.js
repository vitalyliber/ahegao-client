import React from "react";
import useStoreon from "storeon/react";
import { store } from "../store";
import App from "next/app";
import StoreContext from "storeon/react/context";

export const withStoreon = (PageComponent, { ssr = true } = {}) => {
  const withStoreon = ({ initialReduxState, ...props }) => {
    // const store = getOrInitializeStore(initialReduxState);
    return (
      <StoreContext.Provider value={store}>
        <PageComponent {...props} />
      </StoreContext.Provider>
    );
  };

  // Make sure people don't use this HOC on _app.js level
  if (process.env.NODE_ENV !== "production") {
    const isAppHoc =
      PageComponent === App || PageComponent.prototype instanceof App;
    if (isAppHoc) {
      throw new Error("The withStoreon HOC only works with PageComponents");
    }
  }

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== "production") {
    const displayName =
      PageComponent.displayName || PageComponent.name || "Component";

    withStoreon.displayName = `withStoreon(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    withStoreon.getInitialProps = async context => {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      // const reduxStore = getOrInitializeStore();

      // Provide the store to getInitialProps of pages
      context.storeonStore = store;

      // Run getInitialProps from HOCed PageComponent
      const pageProps =
        typeof PageComponent.getInitialProps === "function"
          ? await PageComponent.getInitialProps(context)
          : {};

      // Pass props to PageComponent
      return {
        ...pageProps,
        // initialReduxState: reduxStore.getState()
      };
    };
  }

  return withStoreon;
};

let reduxStore;
const getOrInitializeStore = initialState => {
  // Always make a new store if server, otherwise state is shared between requests
  if (typeof window === "undefined") {
    return initializeStore(initialState);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!reduxStore) {
    reduxStore = initializeStore(initialState);
  }

  return reduxStore;
};
