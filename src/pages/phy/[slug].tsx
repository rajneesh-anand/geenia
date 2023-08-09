import Container from "@components/ui/container";
import Layout from "@components/layout";
import Breadcrumb from "@components/ui/breadcrumb";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import Divider from "@components/ui/divider";
import Seo from "@components/seo/seo";
import ProductDetail from "@components/product/product-detail/product-deatil";
import axios from "axios";

export default function ProductPage({ product }: any) {
  return (
    <>
      <Seo
        title={product.name}
        description={product.description}
        path={`bodycare/${product.slug}`}
      />
      <Divider />
      <div className="pt-6 lg:pt-7">
        <Container>
          <Breadcrumb />
          <ProductDetail product={product} />
        </Container>
      </div>

      {/* <RelatedProductFeed uniqueKey="related-products" /> */}
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
    `${process.env.NEXT_PUBLIC_NODE_API}/product/phy/${slug}`
  );

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
