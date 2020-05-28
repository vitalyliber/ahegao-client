import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Nav from "../../components/nav";
import PostImage from "../../components/Post";
import { getPost } from "../../api/posts";
import HeadCommon from "../../components/HeadCommon";
import capitalize from "../../utils/capitalize";
import Footer from "../../components/Footer";
import updatePost from "../../utils/updatePost";
import Loading from "../../components/Loading";
import Categories from "../../components/Categories";
import {getCategories} from "../../api/categories";

const Apps = props => {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <>
        <HeadCommon />
        <Nav />
        <br />
        <Loading />
      </>
    );
  }
  const { product, categories } = props;
  const [data, setData] = useState(product);
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
        <Categories list={categories} />
        <div className="row">
          <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-sm-10 offset-sm-1 pl-0 pr-0">
            <PostImage
              showText
              el={{ ...data, updatePost: updatePost(setData) }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Apps;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  };
}
export async function getStaticProps({ params }) {
  const { id } = params;
  const {
    data: { categories }
  } = await getCategories();
  const {
    data: { product }
  } = await getPost({ id });
  return { unstable_revalidate: 1, props: { product, categories } };
}
