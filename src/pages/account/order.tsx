import { Fragment, useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { IoCheckmarkCircle } from "react-icons/io5";
import Seo from "@components/seo/seo";
import Container from "@components/ui/container";
import Layout from "@components/layout";
import prisma from "@utils/prisma";
import { useUserAuth } from "@contexts/user.context";

export default function OrderPage() {
  const { logOut } = useUserAuth();
  return (
    <>
      <Seo
        title="About Us"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="about"
      />
      <Container>
        <div className="flex items-center justify-center text-green-700 text-sm mt-16 lg:mb-8">
          <span className="w-10 h-10 me-3 lg:me-4 rounded-full bg-skin-primary bg-opacity-20 flex items-center justify-center flex-shrink-0">
            <IoCheckmarkCircle className="w-5 h-5 text-skin-primary" />
          </span>
          <button onClick={() => logOut()}>sign out</button>
        </div>
      </Container>
    </>
  );
}

OrderPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = await context;

  //   if (data?.STATUS === "TXN_SUCCESS") {
  //     await prisma.order.updateMany({
  //       where: { orderNumber: data.ORDERID },
  //       data: {
  //         amount: data.TXNAMOUNT,
  //         paymentStatus: data.STATUS,
  //         paymentId: data.TXNID,
  //       },
  //     });
  //   }

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
