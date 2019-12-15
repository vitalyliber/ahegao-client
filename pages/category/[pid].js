import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Masonry from "react-masonry-css";
import Nav from "../../components/nav";
import Post from "../../components/Post";
import useScrollRestoration from "../../components/useScrollRestoration";
import { getCategories } from "../../api/categories";
import { getPosts } from "../../api/posts";
import HeadCommon from "../../components/HeadCommon";
import breakpointCols from "../../utils/breakpointCols";
import Footer from "../../components/Footer";
import { fetchProfile } from "../../api/users";
import useAuthState from "../../components/useAuthState";
import updatePostInList from "../../utils/updatePostInList";

let cache = {};

const Category = props => {
  const router = useRouter();
  const { pid } = router.query;
  useScrollRestoration();
  const { data: initialData, categories, user } = props;
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
  useAuthState(user);
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
  let user;
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
  try {
    const result = await fetchProfile(params);
    user = result.data.user;
  } catch (e) {
    console.log(e);
  }
  return { data: data, categories: dataCategories, user };
};

export default Category;
