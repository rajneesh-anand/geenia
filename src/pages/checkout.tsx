import Layout from "@components/layout";
import CheckoutCard from "@components/checkout/checkout-card";
import Container from "@components/ui/container";
import CheckoutDetails from "@components/checkout/checkout-details";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Divider from "@components/ui/divider";
import Seo from "@components/seo/seo";

export default function CheckoutPage() {
  return (
    <>
      <Seo
        title="Checkout"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="checkout"
      />
      <Container className="py-10 2xl:py-12 border-t border-skin-base checkout">
        <CheckoutCard />
      </Container>
      <Divider />
    </>
  );
}

CheckoutPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};
