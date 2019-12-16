import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Masonry from "react-masonry-css";
import Nav from "../../components/nav";
import Post from "../../components/Post";
import useScrollRestoration from "../../components/useScrollRestoration";
import { getPosts } from "../../api/posts";
import HeadCommon from "../../components/HeadCommon";
import breakpointCols from "../../utils/breakpointCols";
import Footer from "../../components/Footer";
import updatePostInList from "../../utils/updatePostInList";

let cache = {};

const Users = props => {
  const router = useRouter();
  const { pid } = router.query;
  useScrollRestoration();
  const { data: initialData } = props;
  const [data, setData] = useState(initialData);
  useEffect(() => {
    if (process.browser) {
      cache["data"] = data;
      cache["pid"] = pid;
    }
  }, [data]);
  const [loading, setLoading] = useState(false);
  const { products } = data;
  return (
    <>
      <HeadCommon />
      <Nav />
      <div className="container">
        <div className="row">
          {products.length === 1 && (
            <div className="col d-flex justify-content-center">
              <Post el={{ ...products[0], updatePost: updatePostInList(setData) }} />
            </div>
          )}
          {products.length > 1 && (
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
          )}
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
                  user_id: pid
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

Users.getInitialProps = async params => {
  const {
    query: { pid }
  } = params;
  let data;
  if (
    cache["data"] &&
    cache["pid"] &&
    cache["pid"] === pid
  ) {
    data = cache["data"];
  } else {
    const resData = await getPosts({ user_id: pid, ctx: params });
    data = resData.data;
  }
  return { data: data };
};

export default Users;
