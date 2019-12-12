import React from "react";
import App from "next/app";
import ScrollUpButton from "react-scroll-up-button";

import "../styles.scss";

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
