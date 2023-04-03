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
    <>
      {data?.pages?.map((page: any, idx: any) => {
        if (page?.data?.length > 0) {
          return (
            <Element
              key={idx}
              name="grid"
              className="flex pt-7 lg:pt-11 pb-16 lg:pb-20"
            >
              <div className="flex-shrink-0 pr-8 xl:pr-16 hidden lg:block w-60 xl:w-80 sticky top-16 h-full">
                <ShopFilters />
              </div>
              <div className="w-full lg:-ml-2 xl:-ml-8 lg:mt-8">
                {/* {data?.pages?.map((page: any, idx: any) => {
          if (page?.data?.length > 0) {
            return <SearchTopBar key={idx} TotalProducts={page.data.length} />;
          }
        })} */}
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
                    data?.pages?.map((page: any) => {
                      return page?.data?.map((product: Product, idx: any) => (
                        <ProductCard
                          key={`product--key-${idx}`}
                          product={product}
                        />
                      ));
                    })
                  )}
                </div>
              </div>
            </Element>
          );
        } else {
          return (
            <div className="flex flex-col items-center justify-center py-32">
              <p className="text-2xl md:text-3xl font-light leading-normal">
                Sorry ! No Product available !{" "}
              </p>
              <p className="mb-8">
                You can find plenty of other products on our homepage.
              </p>
            </div>
          );
        }
      })}
    </>
  );
};
