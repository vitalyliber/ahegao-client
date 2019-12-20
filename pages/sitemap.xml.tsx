import Axios from "axios";
import hostname from "../api/hostname";

const Sitemap = () => null;
Sitemap.getInitialProps = async ctx => {
  const { res } = ctx;
  if (!res) return {};
  res.setHeader("content-type", "application/xml");
  const result = await Axios({
    method: "get",
    url: `${hostname}/sitemap.xml`,
    data: null
  });
  res.end(result.data);
  return {};
};
export default Sitemap;
