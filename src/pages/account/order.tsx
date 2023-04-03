import { Fragment, useState, useEffect, useLayoutEffect } from "react";
import { GetServerSideProps } from "next";

import { IoCheckmarkCircle } from "react-icons/io5";
import Seo from "@components/seo/seo";
import Container from "@components/ui/container";
import Layout from "@components/layout";
import prisma from "@utils/prisma";
import { useUserAuth } from "@contexts/user.context";
import Router, { useRouter } from "next/router";
import { getSession, useSession, signOut } from "next-auth/react";
import AccountLayout from "@components/my-account/account-layout";
import OrderTable from "@components/order/order-table";
import { useOrdersQuery } from "@framework/order/get-all-orders";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function OrderPage() {
  const { data, isLoading } = useOrdersQuery({});
  return (
    <>
      <Seo
        title="Orders"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="account/order"
      />
      <AccountLayout>
        {!isLoading ? (
          <OrderTable orders={data?.data} />
        ) : (
          <div>Loading...</div>
        )}
      </AccountLayout>
    </>
  );
}

OrderPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

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
