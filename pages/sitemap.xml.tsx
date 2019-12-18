import dayjs from "dayjs";

import { getPosts } from "../api/posts";
import { getCategories } from "../api/categories";

const Sitemap = () => null;
Sitemap.getInitialProps = async ctx => {
  const { res } = ctx;
  if (!res) return {};
  const hostname = "https://ahegao.casply.com";
  let content = "";
  const addUrl = ({
    url = "",
    updated_at = dayjs().toDate(),
    changefreq = "daily",
    priority = "0.1"
  } = {}) =>
    (content += `<url><loc>${hostname}${url}</loc><lastmod>${dayjs(
      updated_at
    ).format(
      "YYYY-MM-DD"
    )}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`);
  const resCategories = await getCategories();
  resCategories.data.categories.forEach(({ label }) =>
    addUrl({ url: `categories/${label}` })
  );
  const result = await getPosts({
    per: 10000,
    ctx
  });
  result.data.products.forEach(({ id, updated_at }) => {
    addUrl({ url: `/posts/${id}`, priority: "0.5" });
    addUrl({ url: `/apps/${id}`, priority: "0.4" });
  });
  res.setHeader("content-type", "application/xml");
  res.end(
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${content}</urlset>`
  );
  return {};
};
export default Sitemap;
