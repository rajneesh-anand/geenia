import { QueryOptionsType, Product } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import shuffle from "lodash/shuffle";
import { useInfiniteQuery } from "react-query";

type PaginatedProduct = {
  data: Product[];
  paginatorInfo: any;
};
const fetchProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const category = _params?.category?.toString().split(",");
  // console.log(category);
  const { data } = await http.get(`/products/${_params.slug}`);
  // console.log(data);
  if (category) {
    const subCategoryResult = data?.products.reduce((acc: any, item: any) => {
      let subCategoryExist = JSON.parse(item.category).find((cat: any) =>
        category?.includes(cat.slug)
      );

      if (subCategoryExist) {
        acc.push(item);
      }
      return acc;
    }, []);

    return {
      data: subCategoryResult as Product[],
      paginatorInfo: {
        nextPageUrl: "",
      },
    };
  } else {
    return {
      data: data?.products as Product[],
      paginatorInfo: {
        nextPageUrl: "",
      },
    };
  }
};

const useProductsQuery = (options: QueryOptionsType) => {
  return useInfiniteQuery<PaginatedProduct, Error>(
    [API_ENDPOINTS.PRODUCTS, options],
    fetchProducts,
    {
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    }
  );
};

export { useProductsQuery, fetchProducts };
