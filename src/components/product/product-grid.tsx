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
import SearchTopBar from "@components/search/search-top-bar";
import { ShopFilters } from "@components/search/filters";
import { Element } from "react-scroll";

interface ProductGridProps {
  className?: string;
}

export const ProductGrid: FC<ProductGridProps> = ({ className = "" }) => {
  const { query } = useRouter();
  const {
    isFetching: isLoading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    data,
    error,
  } = useProductsQuery({ limit: LIMITS.PRODUCTS_LIMITS, ...query });

  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-6 gap-3 md:gap-4 2xl:gap-5",
        className
      )}
    >
      {error ? (
        <div className="col-span-full">
          <Alert message={error?.message} />
        </div>
      ) : isLoading && !data?.pages?.length ? (
        Array.from({ length: 30 }).map((_, idx) => (
          <ProductCardLoader
            key={`product--key-${idx}`}
            uniqueKey={`product--key-${idx}`}
          />
        ))
      ) : (
        data?.pages?.map((page: any) =>
          page?.data?.length > 0 ? (
            page?.data?.map((product: Product, idx: any) => (
              <ProductCard key={idx} product={product} />
            ))
          ) : (
            <p>No Data</p>
          )
        )
      )}
    </div>
  );
};
