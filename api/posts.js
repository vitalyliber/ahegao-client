import Axios from "axios";
import Cookies from "js-cookie";
import getIsomorphicToken from "../utils/getIsomorphicToken";

export const getPosts = ({
  page = 1,
  per = 11,
  only_visible = true,
  category_title = null,
  user_id = null,
  ctx = null
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
      "Content-type": "application/json",
      Authorization: `Bearer ${getIsomorphicToken(ctx)}`
    }
  });
};

export const getPost = ({ id, ctx = null } = {}) => {
  return Axios({
    method: "get",
    url: `https://ahegao.casply.com/api/products/${id}`,
    data: null,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getIsomorphicToken(ctx)}`
    }
  });
};

export const deletePostLike = id => {
  const token = Cookies.get("token");
  return Axios({
    method: "delete",
    url: `https://ahegao.casply.com/api/likes/${id}`,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
};

export const likePost = product_id => {
  const token = Cookies.get("token");
  return Axios({
    method: "post",
    url: "https://ahegao.casply.com/api/likes",
    data: { product_id },
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
};
