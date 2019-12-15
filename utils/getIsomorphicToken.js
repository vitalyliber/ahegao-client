import Cookies from "js-cookie";
import nextCookies from "next-cookies";

const getIsomorphicToken = ctx => {
  if (process.browser) {
    return Cookies.get("token");
  } else {
    return nextCookies(ctx).token;
  }
};

export default getIsomorphicToken;
