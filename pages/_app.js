import React from "react";
import App from "next/app";
import Router from "next/router";
import ScrollUpButton from "react-scroll-up-button";
import StoreContext from "storeon/react/context";
import "@fortawesome/fontawesome-svg-core/styles.css";
import * as gtag from "../utils/gtag";
import "../styles.scss";
import { store } from "../store";
import AuthModal from "../components/AuthModal";

Router.events.on("routeChangeComplete", url => gtag.pageview(url));

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <StoreContext.Provider value={store}>
        <Component {...pageProps} />
        <ScrollUpButton />
        <AuthModal />
      </StoreContext.Provider>
    );
  }
}

export default MyApp;
