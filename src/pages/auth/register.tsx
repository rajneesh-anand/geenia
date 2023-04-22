import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { getSession } from "next-auth/react";
import Seo from "@components/seo/seo";
import Container from "@components/ui/container";
import Layout from "@components/layout";
// import RegistrationForm from "@components/form/register-form";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(context.locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};

export default function RegisterPage() {
  return <Container>{/* <RegistrationForm /> */}</Container>;
}

RegisterPage.Layout = Layout;
