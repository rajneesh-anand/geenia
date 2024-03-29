import Layout from "@components/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import Container from "@components/ui/container";
import ResetPassword from "@components/auth/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <Container>
      <ResetPassword />
    </Container>
  );
}

ResetPasswordPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};
