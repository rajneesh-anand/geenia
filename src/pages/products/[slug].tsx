import Container from "@components/ui/container";
import Layout from "@components/layout";
import { ShopFilters } from "@components/search/filters";
import { ProductGridTwo } from "@components/product/product-grid-two";
import { ProductGrid } from "@components/product/product-grid";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { Element } from "react-scroll";
import axios from "axios";
import Seo from "@components/seo/seo";
import Divider from "@components/ui/divider";
import Image from "next/image";
import Breadcrumb from "@components/ui/breadcrumb";
import { useRouter } from "next/router";
import { useProductsQuery } from "@framework/product/get-all-products";
import Alert from "@components/ui/alert";
import ProductCardLoader from "@components/ui/loaders/product-card-loader";
import { Product } from "@framework/types";
import ProductCard from "@components/product/product-cards/product-card";

export default function Products() {
  return (
    <>
      <Seo
        title="Geenia Organic Beauty Products"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="products"
      />
      <Divider />
      <Container className="bg-[#EBE0F0]">
        <div className="pt-4">
          <Breadcrumb />
        </div>

        <Container>
          <Element name="grid" className="flex py-6 ">
            <div className="flex-shrink-0 hidden lg:block w-72  sticky top-16 h-full">
              <ShopFilters />
            </div>
            <div className="w-full ">
              <ProductGrid />
            </div>
          </Element>
        </Container>

        {/* {data ? (
          <Element name="grid" className="flex py-6 ">
            <div className="flex-shrink-0 hidden lg:block w-72  sticky top-16 h-full">
              <ShopFilters />
            </div>
            <div className="w-full ">
              <ProductGridTwo products={data} />
            </div>
          </Element>
        ) : (
          <div className="flex flex-col items-center justify-center no-product-found">
            <Image
              src="/images/noproduct2.svg"
              alt="no-product"
              width={450}
              height={550}
            />

            <p className="pb-16">
              You can find plenty of other products on our homepage
            </p>
          </div>
        )} */}
      </Container>
    </>
  );
}

Products.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  locale,
}) => {
  // const { slug }: any = params;

  // const { data } = await axios.get(
  //   `${process.env.NEXT_PUBLIC_NODE_API}/products/${slug}`
  // );

  return {
    props: {
      // data: data.products,
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};
