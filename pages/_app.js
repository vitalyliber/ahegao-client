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
import { fetchProfile } from "../api/users";

Router.events.on("routeChangeComplete", url => gtag.pageview(url));

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    // more about it
    // https://spectrum.chat/next-js/general/app-js-getinitialprops-explained~539bdc35-a8b0-4dfa-972b-0dd9a0f1ac67
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    let user;
    try {
      const result = await fetchProfile(ctx);
      user = result.data.user;
    } catch (e) {
      console.log(e);
    }
    return { pageProps: { ...pageProps, user } };
  }

  render() {
    const {
      Component,
      pageProps,
      pageProps: { user }
    } = this.props;
    const storeonStore = store();
    if (user) {
      const { admin } = user;
      storeonStore.dispatch("user/set_local_info", { authorized: true, admin });
    }
    return (
      <StoreContext.Provider value={storeonStore}>
        <Component {...pageProps} />
        <ScrollUpButton />
        <AuthModal />
      </StoreContext.Provider>
    );
  }
}

export default MyApp;
