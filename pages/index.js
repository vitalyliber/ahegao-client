import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import Nav from "../components/nav";
import Post from "../components/Post";
import useScrollRestoration from "../components/useScrollRestoration";
import { getPosts } from "../api/posts";
import HeadCommon from "../components/HeadCommon";
import breakpointCols from "../utils/breakpointCols";
import Footer from "../components/Footer";
import updatePostInList from "../utils/updatePostInList";
import AuthModal from "../components/AuthModal";
import StoreContext from "storeon/react/context";

let cache = {};

const Home = props => {
  useScrollRestoration();
  const { data: initialData } = props;
  const [data, setData] = useState(initialData);
  useEffect(() => {
    if (process.browser) {
      cache["data"] = data;
    }
  }, [data]);
  const [loading, setLoading] = useState(false);
  const { products, total_count } = data;

  return (
    <>
      <HeadCommon />
      <Nav />
      <div className="container">
        <p className="text-center text-black-50 mb-4">{total_count} ahegao pics</p>
        <div className="row">
          <Masonry
            breakpointCols={breakpointCols}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {products.map(el => {
              return (
                <Post
                  key={el.id}
                  el={{ ...el, updatePost: updatePostInList(setData) }}
                />
              );
            })}
          </Masonry>
        </div>
        {!data.last_page && (
          <button
            disabled={loading}
            className="btn btn-outline-info btn-block mb-4"
            onClick={async () => {
              setLoading(true);
              try {
                const newData = await await getPosts({ page: data.next_page });
                const mergedData = {
                  ...newData.data,
                  products: [...products, ...newData.data.products]
                };
                setData(mergedData);
              } catch (e) {
                console.log(e);
              } finally {
                setLoading(false);
              }
            }}
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        )}
      </div>
      <Footer />
      <AuthModal />
    </>
  );
};

Home.getInitialProps = async params => {
  let data;
  if (cache["data"]) {
    data = cache["data"];
  } else {
    const resData = await getPosts({ ctx: params });
    data = resData.data;
  }
  return { data: data };
};

export default Home;
