import { Product } from "@framework/types";
import ProductCard from "@components/product/product-cards/product-card";
import Container from "@components/ui/container";

export type IProps = {
  products: Product[];
};

const ProductCatList = ({ products }: IProps) => {
  return (
    <>
      <Container>
        {products.length > 0 ? (
          <div className="grid sm:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-6 gap-2 ">
            {products?.map((product: Product) => (
              <ProductCard
                key={`product--key-${product.id}`}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-full ">
            <img
              src="/images/noproduct.svg"
              alt="no product"
              height={400}
              width={400}
            />
          </div>
        )}
      </Container>
    </>
  );
};

export default ProductCatList;