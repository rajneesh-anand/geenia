import { QueryOptionsType, Category } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchCategory = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;

  const {
    data: { data },
  } = await http.get("/categories");

  const result = data.reduce((acc: any, item: any) => {
    if (item.slug === _params.slug) {
      acc.push(item);
    }
    return acc;
  }, []);

  return { category: { data: result as Category[] } };
};
export const useCategoriesQuery = (options: QueryOptionsType) => {
  return useQuery<{ category: { data: Category[] } }, Error>(
    [API_ENDPOINTS.CATEGORIES, options],
    fetchCategory
  );
};
