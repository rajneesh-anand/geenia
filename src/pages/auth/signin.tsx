import Layout from "@components/layout";
import Container from "@components/ui/container";
import { GetServerSideProps } from "next";
import { getCsrfToken, getSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function LoginPage({ csrfToken }: any) {
  return <Container>{/* <SignInForm csrfToken={csrfToken} /> */}</Container>;
}

LoginPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const csrfToken = await getCsrfToken(context);
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
      csrfToken: csrfToken,
      ...(await serverSideTranslations(context.locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};
