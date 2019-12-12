import React from "react";
import App from "next/app";
import Router from 'next/router';
import ScrollUpButton from "react-scroll-up-button";
import "@fortawesome/fontawesome-svg-core/styles.css";
import * as gtag from "../utils/gtag";
import "../styles.scss";

Router.events.on("routeChangeComplete", url => gtag.pageview(url));

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Component {...pageProps} />
        <ScrollUpButton />
      </>
    );
  }
}

export default MyApp;
