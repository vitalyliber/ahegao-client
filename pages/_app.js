import "@fortawesome/fontawesome-svg-core/styles.css";
import Router from "next/router";
import * as gtag from "../utils/gtag";
import "../styles.scss";

Router.events.on("routeChangeComplete", url => gtag.pageview(url));

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
