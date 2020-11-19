import React from "react";
import { getCategories } from "../../api/categories";
import { getPosts } from "../../api/posts";
import { useRouter } from "next/router";
import HeadCommon from "../../components/HeadCommon";
import Nav from "../../components/nav";
import Loading from "../../components/Loading";
import Post from "../../components/Post";
import Pagination from "../../components/Pagination";
import Footer from "../../components/Footer";
import Categories from "../../components/Categories";

const New = props => {
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
  const { products, total_count, total_pages, current_page, last_page } = data;

  return (
    <>
      <HeadCommon />
      <Nav />
      <div className="container">
        <Categories list={categories} />
        <p className="text-center text-black-50 mb-4">
          {total_count} ahegao pics
        </p>
        <Pagination
          totalPages={total_pages}
          currentPage={current_page}
          lastPage={last_page}
          href="/new/[id]"
          as={page => `/new/${page}`}
        />
        <div className="row">
          <div className="card-columns">
            {products.map(el => {
              return <Post key={el.id} el={el} />;
            })}
          </div>
          <Pagination
            totalPages={total_pages}
            currentPage={current_page}
            lastPage={last_page}
            href="/new/[id]"
            as={page => `/new/${page}`}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default New;

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
  const { data } = await getPosts({ page: id });
  return { revalidate: 1, props: { data, categories } };
}
