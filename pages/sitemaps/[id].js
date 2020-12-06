import moment from "moment";
import hostname, {
  SITEMAP_PAGE_SIZE,
  clientEndpoint
} from "../../api/hostname";

const createSitemap = list => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${list
          .map(({ id, updated_at }) => {
            return `
                    <url>
                        <loc>${`${clientEndpoint}/posts/${id}`}</loc>
                        <changefreq>daily</changefreq>
                        <priority>1</priority>
                        <lastmod>${moment(updated_at).format(
                          "YYYY-MM-DD"
                        )}</lastmod>
                    </url>
                `;
          })
          .join("")}
    </urlset>
    `;

// remove component
export async function getServerSideProps({ res, params }) {
  const url = `${hostname}/api/products?per=${SITEMAP_PAGE_SIZE}&page=${params.id}&only_visible=true`;
  console.log(url);
  const request = await fetch(url);
  const data = await request.json();
  res.setHeader("Content-Type", "text/xml");
  res.write(createSitemap(data.products));
  res.end();
}

// add component here
export default () => null;
