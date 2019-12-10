import Axios from "axios";

export const getPosts = ({
  page = 1,
  per = 11,
  only_visible = true,
  category_title = null,
  user_id = null
} = {}) => {
  return Axios({
    method: "get",
    url: `https://ahegao.casply.com/api/products`,
    params: {
      only_visible,
      page,
      per,
      category_title,
      user_id
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
