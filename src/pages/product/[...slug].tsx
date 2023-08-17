import Container from "@components/ui/container";
import Layout from "@components/layout";
import ProductDetail from "@components/product/product-detail/product-deatil";
import Breadcrumb from "@components/ui/breadcrumb";
import { GetServerSideProps } from "next";
import Divider from "@components/ui/divider";
import Seo from "@components/seo/seo";

import axios from "axios";

export default function ProductPage({ product }: any) {
  console.log(product);
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
          {/* <ProductDetail product={product} /> */}
        </Container>
      </div>
    </>
  );
}

ProductPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug }: any = params;
  // console.log(slug);

  // const { data } = await axios.get(
  //   `${process.env.NEXT_PUBLIC_NODE_API}/product/skincare/${slug}`
  // );

  return {
    props: {},
  };
};
