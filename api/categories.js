import Axios from "axios";
import hostname from "./hostname";

export const getCategories = () => {
  return Axios({
    method: "get",
    url: `${hostname}/api/categories`,
    data: null,
    headers: {
      "Content-type": "application/json"
    }
  });
};
