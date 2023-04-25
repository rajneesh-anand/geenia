import { GetServerSideProps } from "next";
import axios from "axios";

const Sitemap = () => {};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_NODE_API}/getslug-links`
  );
  const baseUrl = "https://geenia.in";

  const productLinks = data.data;

  const staticPages = [
    "https://geenia.in/products/bodycare",
    "https://geenia.in/products/skincare",
    "https://geenia.in/products/phy",
    "https://geenia.in/products/haircare",
    "https://geenia.in/products/makeup",
    "https://geenia.in/about",
    "https://geenia.in/contact",
    "https://geenia.in/faq",
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
   
      ${staticPages
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>weekly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}

        ${productLinks
          .map((item: any) => {
            return `
              <url>
                <loc>${baseUrl}/${item.item_category}/${item.slug}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>1.0</priority>
              </url>
            `;
          })
          .join("")}


            
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
