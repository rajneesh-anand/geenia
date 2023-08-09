import Pagination from "@components/ui/pagination";
import { ProductPaginator } from "@framework/types";
import { Product } from "@framework/types";
import ProductCard from "@components/product/product-cards/product-card";
import Container from "@components/ui/container";

export type IProps = {
  products?: ProductPaginator;
  onPagination: (current: number) => void;
};

const ProductList = ({ products, onPagination }: IProps) => {
  const { data, paginatorInfo } = products! ?? {};

  return (
    <>
      {data.length > 0 ? (
        <>
          <Container>
            <div className="grid sm:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-6 gap-2 ">
              {data?.map((product: Product) => (
                <ProductCard
                  key={`product--key-${product.id}`}
                  product={product}
                />
              ))}
            </div>
          </Container>

          {!!paginatorInfo.total && (
            <div className="flex justify-center items-center bg-[#fff7e6] py-4 my-2">
              <Pagination
                total={paginatorInfo.total}
                current={paginatorInfo.currentPage}
                pageSize={paginatorInfo.perPage}
                onChange={onPagination}
                showLessItems
              />
            </div>
          )}
        </>
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
    </>
  );
};

export default ProductList;
