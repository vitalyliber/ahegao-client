import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import Masonry from "react-masonry-css";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import Nav from "../../components/nav";
import Post from "../../components/Post";
import useScrollRestoration from "../../components/useScrollRestoration";
import { getCategories } from "../../api/categories";
import { getPosts } from "../../api/posts";
import HeadCommon from "../../components/HeadCommon";
import breakpointCols from "../../utils/breakpointCols";
import Footer from "../../components/Footer";

let cache = {};

const Category = props => {
  const router = useRouter();
  const { pid } = router.query;
  useScrollRestoration();
  const { data: initialData, categories } = props;
  const [data, setData] = useState(initialData);
  useEffect(() => {
    if (process.browser) {
      cache["data"] = data;
      cache["categories"] = categories;
      cache["pid"] = pid;
    }
  }, [data]);
  // need for autoupdating
  // when user clicked by another category
  useEffect(() => {
    setData(initialData);
  }, [initialData]);
  const [loading, setLoading] = useState(false);
  const { products } = data;
  return (
    <>
      <HeadCommon />
      <Nav categories={categories} />
      <div className="container">
        <div className="row">
          <Masonry
            breakpointCols={breakpointCols}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {products.map(el => {
              return <Post key={el.id} el={el} />;
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
                const newData = await await getPosts({
                  page: data.next_page,
                  category_title: pid
                });
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
    </>
  );
};

Category.getInitialProps = async ({ query: { pid } }) => {
  let data;
  let dataCategories;
  if (
    cache["data"] &&
    cache["categories"] &&
    cache["pid"] &&
    cache["pid"] === pid
  ) {
    data = cache["data"];
    dataCategories = cache["categories"];
  } else {
    const resData = await getPosts({ category_title: pid });
    data = resData.data;
    const resCategories = await getCategories();
    dataCategories = resCategories.data.categories;
  }
  return { data: data, categories: dataCategories };
};

export default Category;
