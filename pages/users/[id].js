import React from "react";
import { useRouter } from "next/router";
import Nav from "../../components/nav";
import Post from "../../components/Post";
import { getPosts } from "../../api/posts";
import HeadCommon from "../../components/HeadCommon";
import Footer from "../../components/Footer";
import { getCategories } from "../../api/categories";
import Loading from "../../components/Loading";
import Categories from "../../components/Categories";

const Users = props => {
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
  const { data, categories } = props;
  const { products } = data;
  return (
    <>
      <HeadCommon />
      <Nav />
      <div className="container">
        <Categories list={categories} />
        <div className="row">
          {products.length === 1 && (
            <div className="col d-flex justify-content-center">
              <Post el={products[0]} single />
            </div>
          )}
          {products.length > 1 && (
            <div className="card-columns">
              {products.map(el => {
                return <Post key={el.id} el={el} />;
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Users;

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
  const { data } = await getPosts({ user_id: id, per: 300 });
  return { unstable_revalidate: 1, props: { data, categories } };
}
