import React, { useState } from "react";
import Layout from "@components/layout";
import Container from "@components/ui/container";
import PageHeroSection from "@components/ui/page-hero-section";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import Accordion from "@components/ui/accordion";
import { faq } from "@settings/faq-settings";
import Seo from "@components/seo/seo";

export default function TermsPage() {
  return (
    <>
      <Seo
        title="FAQ"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="faq"
      />
      <PageHeroSection heroTitle="text-page-faq" />
      <Container>
        <div className="flex flex-col max-w-2xl 2xl:max-w-4xl mx-auto py-12 ">
          {faq?.map((item, index) => (
            <Accordion
              key={`${item.title}-${index}`}
              item={item}
              translatorNS="faq"
            />
          ))}
        </div>
      </Container>
    </>
  );
}

TermsPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "faq",
        "footer",
      ])),
    },
  };
};
