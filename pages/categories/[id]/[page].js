import React from "react";
import { useRouter } from "next/router";
import Nav from "../../../components/nav";
import Post from "../../../components/Post";
import { getPosts } from "../../../api/posts";
import HeadCommon from "../../../components/HeadCommon";
import Footer from "../../../components/Footer";
import Loading from "../../../components/Loading";
import Pagination from "../../../components/Pagination";
import {getCategories} from "../../../api/categories";
import Categories from "../../../components/Categories";

const CategoriesPage = props => {
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
  const { data, id, categories } = props;
  const { products, total_count, total_pages, current_page, last_page } = data;
  return (
    <>
      <HeadCommon />
      <Nav />
      <p className="text-center text-black-50 mb-4">
        {total_count} {id} ahegao pics
      </p>
      <div className="container">
        <Categories list={categories} />
        <Pagination
          totalPages={total_pages}
          currentPage={current_page}
          lastPage={last_page}
          href="/categories/[id]/[page]"
          as={page => `/categories/${id}/${page}`}
        />
        <div className="row">
          <div className="card-columns">
            {products.map(el => {
              return <Post key={el.id} el={el} />;
            })}
          </div>
        </div>
        <Pagination
          totalPages={total_pages}
          currentPage={current_page}
          lastPage={last_page}
          href="/categories/[id]/[page]"
          as={page => `/categories/${id}/${page}`}
        />
      </div>
      <Footer />
    </>
  );
};

export default CategoriesPage;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  };
}
export async function getStaticProps({ params }) {
  const { id, page } = params;
  const {
    data: { categories }
  } = await getCategories();
  const {data} = await getPosts({ category_title: id, page });
  return { revalidate: 1, props: { data, id, categories } };
}
