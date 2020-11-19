import React from "react";
import Nav from "../components/nav";
import Post from "../components/Post";
import { getPosts } from "../api/posts";
import HeadCommon from "../components/HeadCommon";
import Footer from "../components/Footer";
import { getCategories } from "../api/categories";
import Pagination from "../components/Pagination";
import Categories from "../components/Categories";

const Home = props => {
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

export default Home;

export async function getStaticProps({ params }) {
  const {
    data: { categories }
  } = await getCategories();
  const { data } = await getPosts();
  return { revalidate: 1, props: { data, categories } };
}
