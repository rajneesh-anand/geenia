import { GetServerSideProps } from "next";

const Sitemap = () => {};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = "https://geenia.in";
  async function getProducts() {
    if (
      !(
        process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL &&
        process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY &&
        process.env.GOOGLE_SPREADSHEET_PRODUCTS
      )
    ) {
      throw new Error("forbidden");
    }
    const { GoogleSpreadsheet } = require("google-spreadsheet");
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_PRODUCTS);
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(
        /\\n/gm,
        "\n"
      ),
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle["all_items"]; // or use doc.sheetsById[id]
    const rows = await sheet.getRows(); // can pass in { limit, offset }

    const products = rows?.map(({ slug, item_category }: any) => ({
      slug,
      item_category,
    }));
    return products;
  }

  const productLinks = await getProducts();

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
