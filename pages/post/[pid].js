import Head from "next/head";
import Nav from "../../components/nav";
import PostImage from "../../components/Post";
import React, { useEffect, useState } from "react";
import { getPost } from "../../api/posts";
import { getCategories } from "../../api/categories";
import useScrollRestoration from "../../components/useScrollRestoration";
import HeadCommon from "../../components/HeadCommon";
import capitalize from "../../utils/capitalize";
import Footer from "../../components/Footer";
import { fetchProfile } from "../../api/users";
import useAuthState from "../../components/useAuthState";
import updatePost from "../../utils/updatePost";

let cache = {};

const Post = props => {
  useScrollRestoration();
  const { data: initialData, categories, user } = props;
  const [data, setData] = useState(initialData);
  useEffect(() => {
    if (process.browser) {
      cache["data"] = data;
      cache["categories"] = categories;
    }
  }, [data]);
  useAuthState(user);

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
            <PostImage el={{ ...data, updatePost: updatePost(setData) }} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

Post.getInitialProps = async params => {
  const {
    query: { pid }
  } = params;
  let data;
  let dataCategories;
  let user;
  if (
    cache["data"] &&
    cache["categories"] &&
    cache["data"].id.toString() === pid.toString()
  ) {
    data = cache["data"];
    dataCategories = cache["categories"];
  } else {
    const resData = await getPost({id: pid, ctx: params});
    console.log('ff', resData)
    data = resData.data.product;
    const resCategories = await getCategories();
    dataCategories = resCategories.data.categories;
  }
  try {
    const result = await fetchProfile(params);
    user = result.data.user;
  } catch (e) {
    console.log(e);
  }
  return { data: data, categories: dataCategories, user };
};

export default Post;
