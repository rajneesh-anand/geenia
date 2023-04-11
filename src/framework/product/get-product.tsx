import { Product } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchProduct = async (_slug: string) => {
  const { data } = await http.get(`product/${_slug}`);

  return data.product;
};
export const useProductQuery = (slug: string) => {
  return useQuery<Product, Error>([API_ENDPOINTS.PRODUCTS, slug], () =>
    fetchProduct(slug)
  );
};
