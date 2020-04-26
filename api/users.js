import Axios from "axios";
import hostname from "./hostname";

export const getInstagramName = instagram_user_id => {
  return Axios({
    method: "get",
    url: `${hostname}/api/users/${instagram_user_id}/instagram_username/`,
    data: null
  });
};

