import { useTranslation } from "next-i18next";
import Heading from "@components/ui/heading";
import CategoryFilterMenu from "@components/search/category-filter-menu";
import Alert from "@components/ui/alert";
import Scrollbar from "@components/ui/scrollbar";
import CategoryListCardLoader from "@components/ui/loaders/category-list-card-loader";
import { useCategoriesQuery } from "@framework/category/get-category";
import { useRouter } from "next/router";

export const CategoryFilter = () => {
  const { t } = useTranslation("common");
  const { query } = useRouter();
  const {
    data,
    isLoading: loading,
    error,
  } = useCategoriesQuery({
    limit: 10,
    ...query,
  });

  if (loading) {
    return (
      <div className="hidden xl:block">
        <div className="w-72 mt-8 px-2">
          <CategoryListCardLoader uniqueKey="category-list-card-loader" />
        </div>
      </div>
    );
  }
  if (error) return <Alert message={error.message} />;

  return (
    <div className="block">
      {/* <Heading className="mb-5 -mt-1">{t("text-categories")}</Heading> */}
      {/* <h3 className="font-semibold text-sm uppercase text-slate-900 mb-5 -mt-1 ">
        Select Category
      </h3> */}
      <div className="max-h-full overflow-hidden rounded-md border border-skin-base">
        <Scrollbar className="w-full category-filter-scrollbar">
          {data?.category?.data?.length ? (
            <CategoryFilterMenu items={data?.category?.data} />
          ) : (
            <div className="min-h-full pt-6 pb-8 px-9 lg:p-8">
              {t("text-no-results-found")}
            </div>
          )}
        </Scrollbar>
      </div>
    </div>
  );
};
