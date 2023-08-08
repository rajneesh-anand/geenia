import Layout from "@components/layout";
import { useRouter } from "next/router";
import { useSearchQuery } from "@framework/product/get-all-cookies-products";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import ProductCard from "@components/product/product-cards/product-card";
import Container from "@components/ui/container";
import { Product } from "@framework/types";

export default function SearchPage() {
  const { query } = useRouter();

  const {
    data,
    isLoading: loading,
    error,
  } = useSearchQuery({
    ...query,
  });
  if (loading) return <Loader text="searching" />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <Container>
      {data.length > 0 ? (
        <div className="grid sm:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-6 gap-2 my-4">
          {data?.map((product: Product) => (
            <ProductCard key={`product--key-${product.id}`} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center no-product-found">
          <img
            src="/images/noproduct2.svg"
            alt="no-product"
            width={450}
            height={550}
          />
        </div>
      )}
    </Container>
  );
}

SearchPage.Layout = Layout;
