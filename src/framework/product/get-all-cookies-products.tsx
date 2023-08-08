import { QueryOptionsType, Product } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";
import { mapPaginatorData } from "@utils/data-mappers";

export const fetchCookiesProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.COOKIES_PRODUCTS);
  return data as Product[];
};
export const useCookiesProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>(
    [API_ENDPOINTS.COOKIES_PRODUCTS, options],
    fetchCookiesProducts
  );
};

const fetchNewProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;

  const { page, limit } = _params as QueryOptionsType;

  const {
    data: { data, ...rest },
  } = await http.get(`/products/${_params.slug}?limit=${limit}&page=${page}`);

  return { products: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const useNewProductsQuery = (params: QueryOptionsType, options: any = {}) => {
  return useQuery<any, Error>([, params], fetchNewProducts, {
    ...options,
    keepPreviousData: true,
  });
};

const searchProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;

  console.log(_params);
  const { data } = await http.get(`/search?product=${_params.product}`);
  return data.data;
};

const useSearchQuery = (params: QueryOptionsType, options: any = {}) => {
  return useQuery<any, Error>([, params], searchProducts, {
    ...options,
    keepPreviousData: true,
  });
};

export { useNewProductsQuery, fetchNewProducts, useSearchQuery };
