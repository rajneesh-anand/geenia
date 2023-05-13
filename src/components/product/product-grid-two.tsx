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
import Image from "next/image";
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
  const [data, setData] = useState<Product[]>(products);
  const { query } = useRouter();

  useEffect(() => {
    const category = query?.category?.toString().split(",");
    console.log(category);

    if (category) {
      const subCategoryResult = products.reduce((acc: any, item: any) => {
        console.log(item.category);
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
      {data.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-6 gap-3 lg:ml-2">
          {data?.map((product: Product, idx: any) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center no-product-found">
          <Image
            src="/images/noproduct.svg"
            alt="no-product"
            width={450}
            height={550}
          />
        </div>
      )}
    </>
  );
};
