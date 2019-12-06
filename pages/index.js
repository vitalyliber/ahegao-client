import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import "../styles.scss";
import Nav from "../components/nav";
import { apiDomain } from "../utils/constants";

const Home = props => {
  const { data: initialData, categories } = props;
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const { products } = data;
  return (
    <>
      <Head>
        <title>Ahegao faces</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav categories={categories} />

      <div className="container">
        <div className="row">
          {products.map(el => {
            return (
              <div className="col-sm-12 col-md-6" key={el.id}>
                <div className="d-flex align-items-center mb-2 justify-content-between">
                  <Link href="/user/[pid]" as={`/user/${el.user_id}`}>
                    <div className="d-flex align-items-center">
                      <img
                        height="35"
                        width="35"
                        className="rounded-circle"
                        src={el.user_avatar}
                      />
                      <p className="mb-0 ml-2 font-weight-bold">
                        {el.username}
                      </p>
                    </div>
                  </Link>
                  <div className="text-black-50 d-inline">
                    {dayjs(el.updated_at).fromNow()}
                  </div>
                </div>
                <Link href="/post/[pid]" as={`/post/${el.id}`}>
                  <img
                    className="img-fluid mb-3"
                    src={`${apiDomain}${el.image}`}
                  />
                </Link>
              </div>
            );
          })}
        </div>
        <button
          disabled={loading}
          className="btn btn-outline-info btn-block mb-4"
          onClick={async () => {
            setLoading(true);
            try {
              const newData = await Axios({
                method: "get",
                url: `https://ahegao.casply.com/api/products`,
                params: {
                  only_visible: true,
                  page: data.next_page,
                  per: 10
                },
                data: null,
                headers: {
                  "Content-type": "application/json"
                }
              });
              setData({
                ...newData.data,
                products: [...products, ...newData.data.products]
              });
            } catch (e) {
              console.log(e);
            } finally {
              setLoading(false);
            }
          }}
        >
          {loading ? "Loading..." : "Load more"}
        </button>
      </div>
    </>
  );
};

Home.getInitialProps = async ({ req }) => {
  const data = await Axios({
    method: "get",
    url: `https://ahegao.casply.com/api/products`,
    params: {
      only_visible: true,
      page: 1,
      per: 10
    },
    data: null,
    headers: {
      "Content-type": "application/json"
    }
  });
  const dataCategories = await Axios({
    method: "get",
    url: `https://ahegao.casply.com/api/categories`,
    data: null,
    headers: {
      "Content-type": "application/json"
    }
  });
  return { data: data.data, categories: dataCategories.data.categories };
};

export default Home;
