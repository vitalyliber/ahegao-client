import Head from "next/head";
import Nav from "../../components/nav";
import PostImage from "../../components/Post";
import React, { useEffect, useState } from "react";
import { getPost } from "../../api/posts";
import { getCategories } from "../../api/categories";
import useScrollRestoration from "../../components/useScrollRestoration";
import HeadCommon from "../../components/HeadCommon";
import capitalize from "../../utils/capitalize";

let cache = {};

const Post = (props) => {
  useScrollRestoration();
  const { data: initialData, categories } = props;
  const [data] = useState(initialData);
  useEffect(() => {
    if (process.browser) {
      cache["data"] = data;
      cache["categories"] = categories;
    }
  }, [data]);

  return (
    <>
      <HeadCommon />
      <Head>
        <title>{capitalize(data.username)}'s ahegao</title>
      </Head>
      <Nav categories={categories} />
      <div className="container">
        <div className="row">
          <div className="col d-flex justify-content-center">
            <PostImage el={data} />
          </div>
        </div>
      </div>
    </>
  );
};

Post.getInitialProps = async ({ req, query }) => {
  const { pid } = query;
  let data;
  let dataCategories;
  if (
    cache["data"] &&
    cache["categories"] &&
    cache["data"].id.toString() === pid.toString()
  ) {
    data = cache["data"];
    dataCategories = cache["categories"];
  } else {
    const resData = await getPost(pid);
    data = resData.data.product;
    const resCategories = await getCategories();
    dataCategories = resCategories.data.categories;
  }
  return { data: data, categories: dataCategories };
};

export default Post;
