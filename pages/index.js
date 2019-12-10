import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Masonry from "react-masonry-css";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import Nav from "../components/nav";
import Post from "../components/Post";
import useScrollRestoration from "../components/useScrollRestoration";
import { getCategories } from "../api/categories";
import { getPosts } from "../api/posts";
import HeadCommon from "../components/HeadCommon";

let cache = {};

const Home = props => {
  useScrollRestoration();
  const { data: initialData, categories } = props;
  const [data, setData] = useState(initialData);
  useEffect(() => {
    if (process.browser) {
      cache["data"] = data;
      cache["categories"] = categories;
    }
  }, [data]);
  const [loading, setLoading] = useState(false);
  const { products } = data;
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 2,
    500: 1
  };
  return (
    <>
      <HeadCommon />
      <Nav categories={categories} />
      <div className="container">
        <div className="row">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {products.map(el => {
              return <Post el={el} />;
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
    </>
  );
};

Home.getInitialProps = async ({ req }) => {
  let data;
  let dataCategories;
  if (cache["data"] && cache["categories"]) {
    data = cache["data"];
    dataCategories = cache["categories"];
  } else {
    const resData = await getPosts();
    data = resData.data;
    const resCategories = await getCategories();
    dataCategories = resCategories.data.categories;
  }
  return { data: data, categories: dataCategories };
};

export default Home;
