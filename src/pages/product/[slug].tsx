import Container from "@components/ui/container";
import Layout from "@components/layout";
import ProductSingleDetails from "@components/product/product";
import DownloadApps from "@components/common/download-apps";
import PopcornJerkyProductFeed from "@components/product/feeds/popcorn-jerky-product-feed";
import RelatedProductFeed from "@components/product/feeds/related-product-feed";
import Breadcrumb from "@components/ui/breadcrumb";
import { useUI } from "@contexts/ui.context";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import Divider from "@components/ui/divider";
import Seo from "@components/seo/seo";
import { fetchProduct } from "@framework/product/get-product";
import axios from "axios";

export default function ProductPage({ product }: any) {
  return (
    <>
      <Seo
        title={product.name}
        description={product.description}
        path={`product/${product.slug}`}
      />
      <Divider />
      <div className="pt-6 lg:pt-7">
        <Container>
          <Breadcrumb />
          <ProductSingleDetails />
        </Container>
      </div>

      <RelatedProductFeed uniqueKey="related-products" />
    </>
  );
}

ProductPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  locale,
}) => {
  const { slug }: any = params;

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_NODE_API}/product/${slug}`
  );
  console.log(data);

  return {
    props: {
      product: data.product,
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};
