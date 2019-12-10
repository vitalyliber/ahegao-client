import Axios from "axios";

export const getCategories = () => {
  return Axios({
    method: "get",
    url: `https://ahegao.casply.com/api/categories`,
    data: null,
    headers: {
      "Content-type": "application/json"
    }
  });
};
