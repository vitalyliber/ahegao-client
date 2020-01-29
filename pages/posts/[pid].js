import React, { useEffect, useState } from "react";
import Head from "next/head";
import { withUserAgent } from "next-useragent";
import Nav from "../../components/nav";
import PostImage from "../../components/Post";
import { getPost } from "../../api/posts";
import useScrollRestoration from "../../components/useScrollRestoration";
import HeadCommon from "../../components/HeadCommon";
import capitalize from "../../utils/capitalize";
import Footer from "../../components/Footer";
import updatePost from "../../utils/updatePost";
import AuthModal from "../../components/AuthModal";

let cache = {};

const Posts = props => {
  useScrollRestoration();
  const { data: initialData, ua } = props;
  const [data, setData] = useState(initialData);
  useEffect(() => {
    if (process.browser) {
      cache["data"] = data;
    }
  }, [data]);
  const title = `Ahegao from ${capitalize(data.username)}`;
  return (
    <>
      <HeadCommon />
      <Head>
        <title>{title}</title>
        <meta name="twitter:title" content={title} />
        <meta name="twitter:image" content={data.image} />
      </Head>
      <Nav />
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-sm-10 offset-sm-1 pl-0 pr-0">
            <PostImage
              showText
              ua={ua}
              el={{ ...data, updatePost: updatePost(setData) }}
            />
          </div>
        </div>
      </div>
      <Footer />
      <AuthModal />
    </>
  );
};

Posts.getInitialProps = async params => {
  const {
    query: { pid }
  } = params;
  let data;
  if (cache["data"] && cache["data"].id.toString() === pid.toString()) {
    data = cache["data"];
  } else {
    const resData = await getPost({ id: pid, ctx: params });
    data = resData.data.product;
  }
  return { data: data };
};

export default withUserAgent(Posts);
