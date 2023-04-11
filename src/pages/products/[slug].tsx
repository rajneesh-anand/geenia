import Container from "@components/ui/container";
import Layout from "@components/layout";
import { ShopFilters } from "@components/search/filters";
import { ProductGrid } from "@components/product/product-grid";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DownloadApps from "@components/common/download-apps";
import { GetServerSideProps } from "next";
import PageHeroSection from "@components/ui/page-hero-section";
import { useTranslation } from "next-i18next";
import { Element } from "react-scroll";
import axios from "axios";

import Seo from "@components/seo/seo";
import Divider from "@components/ui/divider";
import { QueryClient, dehydrate } from "react-query";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { fetchCategories } from "@framework/category/get-all-categories";
import { fetchProducts } from "@framework/product/get-all-products";
import { LIMITS } from "@framework/utils/limits";
import { useProductsQuery } from "@framework/product/get-all-products";

export default function Products({ data }: any) {
  console.log(data);
  return (
    <>
      <Seo
        title="Geenia Organic Beauty Products"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="/products"
      />
      <Divider />
      <Container>
        {data.length > 0 ? (
          <Element name="grid" className="flex pt-7 lg:pt-11 pb-16 lg:pb-20">
            <div className="flex-shrink-0 pe-8 xl:pe-16 hidden lg:block w-80 xl:w-96 sticky top-16 h-full">
              <ShopFilters />
            </div>
            <div className="w-full lg:-ms-2 xl:-ms-8 lg:-mt-1">
              <ProductGrid />
            </div>
          </Element>
        ) : (
          <div className="flex flex-col items-center justify-center py-32">
            <p className="text-2xl md:text-3xl font-light leading-normal">
              Sorry ! No Product available !{" "}
            </p>
            <p className="mb-8">
              You can find plenty of other products on our homepage.
            </p>
          </div>
        )}
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

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_NODE_API}/products/${slug}`
  );

  return {
    props: {
      data,
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};
