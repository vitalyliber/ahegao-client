import Axios from "axios";

export const getPosts = ({ page = 1, per = 11, only_visible = true } = {}) => {
  return Axios({
    method: "get",
    url: `https://ahegao.casply.com/api/products`,
    params: {
      only_visible,
      page,
      per
    },
    data: null,
    headers: {
      "Content-type": "application/json"
    }
  });
};

export const getPost = id => {
  return Axios({
    method: "get",
    url: `https://ahegao.casply.com/api/products/${id}`,
    data: null,
    headers: {
      "Content-type": "application/json"
    }
  });
};
