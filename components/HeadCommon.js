import Head from "next/head";
import React from "react";
import hostname from "../api/hostname";

function HeadCommon() {
  return (
    <Head>
      <title>Ahegao faces</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" type="image/png" href="/favicon.png" />
      <meta name="Description" content="The best Ahegao faces compilation" />
      <meta name="google-site-verification" content="7xxWVswrwD2Hy8qkijHS3YVY3fqwF6MxlZCiVPhdPG0" />
      <meta name="twitter:title" content="Ahegao faces" />
      <meta
        name="twitter:description"
        content="The best Ahegao faces compilation"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="https://ahegao.casply.com/twitter-card.jpg" />
    </Head>
  );
}

export default HeadCommon;
