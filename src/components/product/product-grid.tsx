import { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Alert from "@components/ui/alert";
import Button from "@components/ui/button";
import ProductCard from "@components/product/product-cards/product-card";
import ProductCardLoader from "@components/ui/loaders/product-card-loader";
import cn from "classnames";
import { useProductsQuery } from "@framework/product/get-all-products";
import { LIMITS } from "@framework/utils/limits";
import { Product } from "@framework/types";
import Pagination from "@components/pagination/Pagination";

interface ProductGridProps {
  className?: string;
}

export const ProductGrid: FC<ProductGridProps> = ({ className = "" }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { query } = useRouter();
  const {
    isFetching: isLoading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    data,
    error,
  } = useProductsQuery({ limit: 12, ...query });
  console.log(query);
  console.log(query.page);
  console.log(data?.pages[0].totalItems);
  return (
    <>
      {error ? (
        <div className="col-span-full">
          <Alert message={error?.message} />
        </div>
      ) : isLoading && !data?.pages?.length ? (
        <div className="grid sm:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-6 gap-2">
          {Array.from({ length: 12 }).map((_, idx) => (
            <ProductCardLoader
              key={`product--key-${idx}`}
              uniqueKey={`product--key-${idx}`}
            />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-6 gap-2 ">
          {data?.pages?.map((page: any) => {
            return page?.data?.map((product: Product) => (
              <ProductCard
                key={`product--key-${product.id}`}
                product={product}
              />
            ));
          })}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        lastPage={Math.ceil(Number(data?.pages[0].totalItems) / 12)}
        maxLength={7}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};
