import Axios from "axios";
import getIsomorphicToken from "../utils/getIsomorphicToken";

export const getInstagramName = instagram_user_id => {
  return Axios({
    method: "get",
    url: `https://ahegao.casply.com/api/users/${instagram_user_id}/instagram_username/`,
    data: null
  });
};

export const getAuthToken = email => {
  return Axios({
    method: 'post',
    url: 'https://ahegao.casply.com/api/users',
    data: { user: { email } },
    headers: {
      'Content-type': 'application/json',
    }
  });
};

export const getToken = (email, auth_code) => {
  console.log(email, auth_code);
  return Axios({
    method: 'post',
    url: `https://ahegao.casply.com/api/tokens`,
    data: { user: { email, auth_code } },
    headers: {
      'Content-type': 'application/json',
    }
  });
};

export const fetchProfile = (ctx) => {
  return Axios({
    method: 'get',
    url: 'https://ahegao.casply.com/api/users',
    data: null,
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${getIsomorphicToken(ctx)}`
    }
  })
};
