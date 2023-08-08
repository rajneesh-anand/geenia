import { QueryOptionsType, Product } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useInfiniteQuery } from "react-query";

type PaginatedProduct = {
  data: Product[];
  paginatorInfo: any;
  totalItems?: string | number;
};
const fetchProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const category = _params?.category?.toString().split(",");
  const { data } = await http.get(`/products/${_params.slug}?page=1&limit=12`);

  return {
    data: data?.products as Product[],
    totalItems: data?.totalItems,
    paginatorInfo: {
      nextPageUrl: "",
    },
  };

  // if (category) {
  //   const subCategoryResult = data?.products.reduce((acc: any, item: any) => {
  //     let subCategoryExist = JSON.parse(item.category).find((cat: any) =>
  //       category?.includes(cat.slug)
  //     );

  //     if (subCategoryExist) {
  //       acc.push(item);
  //     }
  //     return acc;
  //   }, []);

  //   return {
  //     data: subCategoryResult as Product[],
  //     paginatorInfo: {
  //       nextPageUrl: "",
  //     },
  //   };
  // } else {
  //   return {
  //     data: data?.products as Product[],
  //     paginatorInfo: {
  //       nextPageUrl: "",
  //     },
  //   };
  // }
};

const fetchProductsCategoriesWise = async ({ queryKey }: any) => {
  const { pathname, query } = queryKey[1];

  const { data } = await http.get(
    `${pathname}?category=${query.categorgy}&page=1&limit=12`
  );

  return {
    data: data?.products as Product[],
    totalItems: data?.totalItems,
    paginatorInfo: {
      nextPageUrl: "",
    },
  };
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

const useProductsQueryCategoriesWise = (options: QueryOptionsType) => {
  return useInfiniteQuery<PaginatedProduct, Error>(
    [API_ENDPOINTS.PRODUCT, options],
    fetchProductsCategoriesWise,
    {
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    }
  );
};

export {
  useProductsQuery,
  fetchProducts,
  useProductsQueryCategoriesWise,
  fetchProductsCategoriesWise,
};
