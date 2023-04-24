import { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Alert from "@components/ui/alert";
import Button from "@components/ui/button";
import ProductCard from "@components/home/home-product-card";
import ProductCardLoader from "@components/ui/loaders/product-card-loader";
import cn from "classnames";
import { useProductsQuery } from "@framework/product/get-all-products";
import { LIMITS } from "@framework/utils/limits";
import Image from "next/image";
// import { Product } from "@framework/types";
import SearchTopBar from "@components/search/search-top-bar";
import { ShopFilters } from "@components/search/filters";
import { Element } from "react-scroll";
import { dealsProducts } from "@data/deals";
import { launchProducts } from "@data/launch";
import { discountProducts } from "@data/discount";
import Container from "@components/ui/container";

type Product = {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: string;
  sale_price: string;
  category: string;
};

export const HomeProductFilter = () => {
  const [activeButton, setActiveButton] = useState<string>("discount");

  return (
    <Container>
      <div className="relative flex flex-col justify-center items-center text-neutral-900 dark:text-neutral-50">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
          Best Organic Beauty Products from Geenia
        </h2>
        <span className="mt-2 md:mt-3 font-normal block text-base sm:text-xl text-neutral-500 dark:text-neutral-400">
          Buy varieties of beauty and fairness organic products at lowest price{" "}
        </span>
      </div>

      <div className="flex items-center justify-center py-8">
        <button
          type="button"
          onClick={() => setActiveButton("discount")}
          className="text-white bg-[#961fa7] hover:bg-[#7d188c] focus:ring-2 focus:ring-[#431d48] font-medium rounded-sm text-lg px-8 py-3 text-center inline-flex items-center  mr-2 mb-2"
        >
          Upto 35% Discount
        </button>
        <button
          type="button"
          onClick={() => setActiveButton("deals")}
          className="text-white bg-[#961fa7] hover:bg-[#7d188c] focus:ring-2 focus:ring-[#431d48] font-medium rounded-sm text-lg px-8 py-3 text-center inline-flex items-center  mr-2 mb-2"
        >
          Deal of the day
        </button>
        <button
          type="button"
          onClick={() => setActiveButton("launch")}
          className="text-white bg-[#961fa7] hover:bg-[#7d188c] focus:ring-2 focus:ring-[#431d48] font-medium rounded-sm text-lg px-8 py-3 text-center inline-flex items-center  mr-2 mb-2"
        >
          {" "}
          New Arrival
        </button>
      </div>
      {activeButton === "discount" && (
        <div className="grid grid-cols-2 md:grid-cols-3  xl:grid-cols-5 3xl:grid-cols-6 gap-3 pb-4">
          {discountProducts?.map((item: Product, idx: any) => (
            <ProductCard key={idx} product={item} />
          ))}
        </div>
      )}

      {activeButton === "deals" && (
        <div className="grid grid-cols-2 md:grid-cols-3  xl:grid-cols-5 3xl:grid-cols-6 gap-3 pb-4">
          {dealsProducts?.map((item: Product, idx: any) => (
            <ProductCard key={idx} product={item} />
          ))}
        </div>
      )}
      {activeButton === "launch" && (
        <div className="grid grid-cols-2 md:grid-cols-3  xl:grid-cols-5 3xl:grid-cols-6 gap-3 pb-4">
          {launchProducts?.map((item: Product, idx: any) => (
            <ProductCard key={idx} product={item} />
          ))}
        </div>
      )}
    </Container>
  );
};
