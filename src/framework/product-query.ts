import { QueryOptionsType } from "@framework/types";
import http from "@framework/http";
import { useQuery } from "react-query";
import { mapPaginatorData } from "@utils/data-mappers";

const fetchProductsCategoryWise = async ({ queryKey }: any) => {
  const { pathname, query } = queryKey[1];
  const { data } = await http.get(`${pathname}?category=${query.categorgy}`);

  return data.products;
};

const fetchProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { page, limit } = _params as QueryOptionsType;
  const {
    data: { data, ...rest },
  } = await http.get(`/products/${_params.slug}?limit=${limit}&page=${page}`);
  return { products: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const searchProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(`/search?product=${_params.product}`);
  return data.data;
};

const useProductsQuery = (params: QueryOptionsType, options: any = {}) => {
  return useQuery<any, Error>([, params], fetchProducts, {
    ...options,
    keepPreviousData: true,
  });
};

const useProductsCategoryWiseQuery = (
  params: QueryOptionsType,
  options: any = {}
) => {
  return useQuery<any, Error>([, params], fetchProductsCategoryWise, {
    ...options,
    keepPreviousData: true,
  });
};

const useSearchQuery = (params: QueryOptionsType, options: any = {}) => {
  return useQuery<any, Error>([, params], searchProducts, {
    ...options,
    keepPreviousData: true,
  });
};

export { useProductsCategoryWiseQuery, useProductsQuery, useSearchQuery };
