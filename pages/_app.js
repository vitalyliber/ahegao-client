import React from "react";
import App from "next/app";
import Router from "next/router";
import ScrollUpButton from "react-scroll-up-button";
import StoreContext from "storeon/react/context";
import "@fortawesome/fontawesome-svg-core/styles.css";
import * as gtag from "../utils/gtag";
import "../styles.scss";
import { store } from "../store";
import { fetchProfile } from "../api/users";
import { getCategories } from "../api/categories";
import Context from "../utils/Context";

Router.events.on("routeChangeComplete", url => gtag.pageview(url));

let cache = {};

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    // more about it
    // https://spectrum.chat/next-js/general/app-js-getinitialprops-explained~539bdc35-a8b0-4dfa-972b-0dd9a0f1ac67
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    let user;
    let categories = [];
    if (cache["user_request"]) {
      user = cache["user"];
    } else {
      try {
        const result = await fetchProfile(ctx);
        user = result.data.user;
        cache["user"] = user;
        cache["user_request"] = "already_tried";
      } catch (e) {
        cache["user_request"] = "already_tried";
        console.log(e);
      }
    }

    if (cache["categories"]) {
      categories = cache["categories"];
    }
    if (!cache["categories"]) {
      try {
        const resCategories = await getCategories();
        categories = resCategories.data.categories;
        cache["categories"] = categories;
      } catch (e) {
        console.log(e);
      }
    }
    return { pageProps: { ...pageProps, user, categories } };
  }

  clearUserCache = () => {
    cache["user_request"] = null;
    cache["user"] = null;
  };

  fillUserCache = user => {
    cache["user_request"] = "already_tried";
    cache["user"] = user;
  };

  render() {
    const {
      Component,
      pageProps,
      pageProps: { user, categories }
    } = this.props;
    const storeonStore = store();
    if (user) {
      const { admin } = user;
      storeonStore.dispatch("user/set_local_info", { authorized: true, admin });
    }
    storeonStore.dispatch("categories/set", { list: categories });
    return (
      <StoreContext.Provider value={storeonStore}>
        <Context.Provider
          value={{
            fillUserCache: this.fillUserCache,
            clearUserCache: this.clearUserCache
          }}
        >
          <Component {...pageProps} />
          <ScrollUpButton />
        </Context.Provider>
      </StoreContext.Provider>
    );
  }
}

export default MyApp;
