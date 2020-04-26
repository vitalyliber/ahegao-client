import Axios from "axios";
import hostname from "./hostname";

export const getPosts = ({
  page = 1,
  per = 11,
  only_visible = true,
  category_title = null,
  user_id = null,
} = {}) => {
  return Axios({
    method: "get",
    url: `${hostname}/api/products`,
    params: {
      only_visible,
      page,
      per,
      category_title,
      user_id,
      all_types: true
    },
    data: null,
    headers: {
      "Content-type": "application/json",
    }
  });
};

export const getPost = ({ id } = {}) => {
  return Axios({
    method: "get",
    url: `${hostname}/api/products/${id}`,
    data: null,
    headers: {
      "Content-type": "application/json",
    }
  });
};
