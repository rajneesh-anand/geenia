import React from "react";
import Layout from "@components/layout";
import { useRouter } from "next/router";
import { useState } from "react";
import dynamic from "next/dynamic";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useProductsCategoryWiseQuery } from "@framework/product-query";
import Breadcrumb from "@components/ui/breadcrumb";

const ProductCatList = dynamic(
  () => import("@components/product/product-list/product-cat-list")
);

export default function FragranceCategoryPage() {
  const router = useRouter();

  const {
    data,
    isLoading: loading,
    error,
  } = useProductsCategoryWiseQuery({
    limit: 12,
    ...router,
  });

  if (loading) return <Loader text="Loading" />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <Breadcrumb />

      <ProductCatList products={data} />
    </>
  );
}

FragranceCategoryPage.Layout = Layout;
