import Axios from "axios";

export const getInstagramName = instagram_user_id => {
  return Axios({
    method: "get",
    url: `https://ahegao.casply.com/api/users/${instagram_user_id}/instagram_username/`,
    data: null
  });
};
