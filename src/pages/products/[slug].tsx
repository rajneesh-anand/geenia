import Container from "@components/ui/container";
import Layout from "@components/layout";
import { ShopFilters } from "@components/search/filters";
import { ProductGrid } from "@components/product/product-grid";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DownloadApps from "@components/common/download-apps";
import { GetServerSideProps } from "next";
import PageHeroSection from "@components/ui/page-hero-section";
import { useTranslation } from "next-i18next";

import Seo from "@components/seo/seo";
import Divider from "@components/ui/divider";
import { QueryClient, dehydrate } from "react-query";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { fetchCategories } from "@framework/category/get-all-categories";
import { fetchProducts } from "@framework/product/get-all-products";
import { LIMITS } from "@framework/utils/limits";
import { useProductsQuery } from "@framework/product/get-all-products";

export default function Products() {
  return (
    <>
      <Seo
        title="Geenia Organic Beauty Products"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="/products"
      />
      <Divider />
      <Container>
        <ProductGrid />
      </Container>
    </>
  );
}

Products.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  locale,
}) => {
  const { slug }: any = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(
    [API_ENDPOINTS.PRODUCTS, { limit: LIMITS.PRODUCTS_LIMITS, category: slug }],
    fetchProducts
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};
