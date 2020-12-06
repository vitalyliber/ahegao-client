import hostname, { SITEMAP_PAGE_SIZE, clientEndpoint } from "../api/hostname";

const createSitemap = pages => `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${Array.from({ length: pages }, (_, i) => i + 1)
          .map(number => {
            return `
                    <sitemap>
                        <loc>${`${clientEndpoint}/sitemaps/${number}.xml`}</loc>
                    </sitemap>
                `;
          })
          .join("")}
    </sitemapindex>
    `;

// remove component
export async function getServerSideProps({ res }) {
  const request = await fetch(
    `${hostname}/api/products?per=${SITEMAP_PAGE_SIZE}&only_visible=true`
  );
  const data = await request.json();
  res.setHeader("Content-Type", "text/xml");
  res.write(createSitemap(data.total_pages));
  res.end();
}

// add component here
export default () => null;
