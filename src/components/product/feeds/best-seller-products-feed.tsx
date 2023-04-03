import type { FC } from "react";
import { useBestSellerProductsQuery } from "@framework/product/get-all-best-seller-products";
import ProductsGridBlock from "../products-grid-block";
import { LIMITS } from "@framework/utils/limits";

interface ProductFeedProps {
  className?: string;
}

const BestSellerProductFeed: FC<ProductFeedProps> = ({ className }) => {
  const { data, isLoading, error } = useBestSellerProductsQuery({
    limit: 50,
  });
  console.log(data);
  return (
    <ProductsGridBlock
      sectionHeading="text-best-grocery-near-you"
      // sectionSubHeading="text-fresh-grocery-items"
      className={className}
      products={data}
      loading={isLoading}
      error={error?.message}
      limit={LIMITS.BEST_SELLER_GROCERY_PRODUCTS_LIMITS}
      uniqueKey="best-sellers"
    />
  );
};
export default BestSellerProductFeed;
