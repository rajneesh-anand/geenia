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
import axios from "axios";

export default function OrderPage({ orders }: any) {
  // const { data, isLoading } = useOrdersQuery({});
  return (
    <>
      <Seo
        title="My Orders | Geenia"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="account/order"
      />
      <AccountLayout>
        <OrderTable orders={orders} />
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
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_NODE_API}/order/order-list`,
    { email: session?.user?.email },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(data);
  return {
    props: {
      orders: data.orders,
      ...(await serverSideTranslations(context.locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};
