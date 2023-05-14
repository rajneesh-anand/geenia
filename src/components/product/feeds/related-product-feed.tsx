import ProductsCarousel from "@components/product/products-carousel";
import { useRelatedProductsQuery } from "@framework/product/get-related-product";
import { LIMITS } from "@framework/utils/limits";
import { useRouter } from "next/router";

interface RelatedProductsProps {
  carouselBreakpoint?: {} | any;
  className?: string;
  uniqueKey?: string;
}

const RelatedProductFeed: React.FC<RelatedProductsProps> = ({
  carouselBreakpoint,
  className,
  uniqueKey = "related-product-popup",
}) => {
  const router = useRouter();
  const category = router.pathname.split("/");
  const { data, isLoading, error } = useRelatedProductsQuery({
    limit: LIMITS.RELATED_PRODUCTS_LIMITS,
    ...router,
  });
  return (
    <ProductsCarousel
      sectionHeading="text-related-products"
      categorySlug={`/products/${category[1]}`}
      className={className}
      products={data}
      loading={isLoading}
      error={error?.message}
      limit={LIMITS.RELATED_PRODUCTS_LIMITS}
      uniqueKey={uniqueKey}
      carouselBreakpoint={carouselBreakpoint}
    />
  );
};

export default RelatedProductFeed;
