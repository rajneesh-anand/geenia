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
// import { Product } from "@framework/types";
import SearchTopBar from "@components/search/search-top-bar";
import { ShopFilters } from "@components/search/filters";
import { Element } from "react-scroll";

type Product = {
  id: string;
  name: string;
  slug: string;
  image: string;
  gallery: string;
  description: string;
  price: string;
  sale_price: string;
  unit: string;
  quantity_in_stock: string;
  tags: string;
  category: string;
};

interface ProductGridProps {
  className?: string;
  products: Product[];
}

export const ProductGridTwo: FC<ProductGridProps> = ({
  className,
  products,
}) => {
  console.log(products);
  const [data, setData] = useState<Product[]>(products);
  const { query } = useRouter();

  useEffect(() => {
    const category = query?.category?.toString().split(",");

    if (category) {
      const subCategoryResult = products.reduce((acc: any, item: any) => {
        let subCategoryExist = JSON.parse(item.category).find((cat: any) =>
          category?.includes(cat.slug)
        );

        if (subCategoryExist) {
          acc.push(item);
        }
        return acc;
      }, []);
      setData(subCategoryResult);
    }
  }, [query]);

  return (
    <>
      {/* {error ? (
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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-6 gap-3 md:gap-4 2xl:gap-5">
              {page?.data?.map((product: Product, idx: any) => (
                <ProductCard key={idx} product={product} />
              ))}
            </div>
          ) : ( */}
      {data.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-6 gap-3  ml-2">
          {data?.map((product: Product, idx: any) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-auto">
          <p className="pt-32 font-medium text-red-700">
            No Product available !
          </p>
        </div>
      )}
    </>
  );
};
