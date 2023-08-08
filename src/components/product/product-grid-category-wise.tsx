import { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Alert from "@components/ui/alert";
import Button from "@components/ui/button";
import ProductCardCategoryWise from "@components/product/product-cards/product-card-category-page";
import ProductCardLoader from "@components/ui/loaders/product-card-loader";
import cn from "classnames";
import { useProductsQueryCategoriesWise } from "@framework/product/get-all-products";
import { LIMITS } from "@framework/utils/limits";
import { Product } from "@framework/types";

interface ProductGridProps {
  className?: string;
}

export const ProductGridCategoriesWise: FC<ProductGridProps> = ({
  className = "",
}) => {
  const router = useRouter();
  const {
    isFetching: isLoading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    data,
    error,
  } = useProductsQueryCategoriesWise({ limit: 12, ...router });
  console.log(data?.pages[0].data.length);

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
      ) : data?.pages[0].data.length!! > 0 ? (
        <div className="grid sm:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-6 gap-2 ">
          {data?.pages?.map((page: any) => {
            return page?.data?.map((product: Product) => (
              <ProductCardCategoryWise
                key={`product--key-${product.id}`}
                product={product}
              />
            ));
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center no-product-found">
          <img
            src="/images/noproduct2.svg"
            alt="no-product"
            width={450}
            height={550}
          />

          <p className="pb-16">
            You can find plenty of other products on our homepage
          </p>
        </div>
      )}
    </>
  );
};
