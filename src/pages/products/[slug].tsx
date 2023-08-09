import Layout from "@components/layout";
import Breadcrumb from "@components/ui/breadcrumb";
import { useRouter } from "next/router";
import { useState } from "react";
import dynamic from "next/dynamic";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useProductsQuery } from "@framework/product-query";

const ProductList = dynamic(
  () => import("@components/product/product-list/product-list")
);

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const { query } = useRouter();

  const {
    data,
    isLoading: loading,
    error,
  } = useProductsQuery({
    limit: 12,
    page,
    ...query,
  });

  if (loading) return <Loader text="Loading" />;
  if (error) return <ErrorMessage message={error.message} />;
  function handlePagination(current: any) {
    setPage(current);
  }
  return (
    <>
      <Breadcrumb />
      <ProductList products={data?.products} onPagination={handlePagination} />
    </>
  );
}

ProductsPage.Layout = Layout;
