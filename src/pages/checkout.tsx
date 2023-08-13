import Layout from "@components/layout";
import CheckoutCard from "@components/checkout/checkout-card";
import Container from "@components/ui/container";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";

export default function CheckoutPage() {
  return (
    <Container>
      <CheckoutCard />
    </Container>
  );
}

CheckoutPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log(session);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
