import { useRouter } from "next/router";
import cn from "classnames";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useUI } from "@contexts/ui.context";
import { useEffect, useMemo, useState } from "react";
import Image from "@components/ui/image";
import { useTranslation } from "next-i18next";
import { FaCheck } from "react-icons/fa";

function checkIsActive(arr: any, item: string) {
  if (arr.includes(item)) {
    return true;
  }
  return false;
}
function CategoryFilterMenuItem({
  className = "bg-skin-yellow-three border-t border-skin-base first:border-t-0 px-3.5 2xl:px-4 py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3",
  item,
  depth = 0,
}: any) {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { pathname, query } = router;
  const selectedCategories = useMemo(
    () => (query?.category ? (query.category as string).split(",") : []),
    [query?.category]
  );
  const isActive =
    checkIsActive(selectedCategories, item.slug) ||
    item?.children?.some((_item: any) =>
      checkIsActive(selectedCategories, _item.slug)
    );
  const [isOpen, setOpen] = useState<boolean>(isActive);
  const [subItemAction, setSubItemAction] = useState<boolean>(false);
  useEffect(() => {
    setOpen(isActive);
  }, [isActive]);
  const { slug, name, children: items, icon } = item;
  const { displaySidebar, closeSidebar } = useUI();

  function toggleCollapse() {
    setOpen((prevValue) => !prevValue);
  }
  const handleChange = () => {
    setSubItemAction(!subItemAction);
  };

  function onClick() {
    const { category, ...restQuery } = query;
    // console.log(category);
    // console.log(restQuery);
    let currentFormState = selectedCategories.includes(slug)
      ? selectedCategories.filter((i) => i !== slug)
      : [...selectedCategories, slug];
    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          ...(!!currentFormState.length
            ? { category: currentFormState.join(",") }
            : {}),
        },
      },
      undefined,
      { scroll: false }
    );

    displaySidebar && closeSidebar();
  }

  let expandIcon;
  // if (Array.isArray(items) && items.length) {
  //   expandIcon = !isOpen ? (
  //     <IoIosArrowDown className="text-base text-skin-base text-opacity-40" />
  //   ) : (
  //     <IoIosArrowUp className="text-base text-skin-base text-opacity-40" />
  //   );
  // }

  return (
    <>
      <li
        onClick={onClick}
        className={cn(
          "flex justify-between items-center transition text-sm md:text-15px",
          { "bg-skin-two": isOpen },
          className
        )}
      >
        <button
          className={cn(
            "flex items-center w-full text-start cursor-pointer group",
            { "py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3": depth > 0 }
          )}
          // onClick={handleChange}
        >
          {icon && (
            <div className="inline-flex flex-shrink-0 2xl:w-12 2xl:h-12 3xl:w-auto 3xl:h-auto mr-2.5 md:mr-4 2xl:mr-3 3xl:mr-4">
              <Image
                src={icon ?? "/placeholder/category-small.svg"}
                alt={name || t("text-category-thumbnail")}
                width={40}
                height={40}
              />
            </div>
          )}
          <span className="text-slate-900 font-poppins uppercase py-0.5">
            {name}
          </span>
          {depth > 0 && (
            <span
              className={`w-[22px] h-[22px] text-13px flex items-center justify-center border-2 border-skin-four rounded-full ml-auto transition duration-500 ease-in-out group-hover:border-skin-yellow text-skin-inverted ${
                selectedCategories.includes(slug) &&
                "border-skin-yellow bg-skin-yellow"
              }`}
            >
              {selectedCategories.includes(slug) && <FaCheck />}
            </span>
          )}
          {expandIcon && <span className="ml-auto">{expandIcon}</span>}
        </button>
      </li>
      {Array.isArray(items) ? (
        <li>
          <ul key="content" className="text-xs px-4 bg-white">
            {items?.map((currentItem: any) => {
              const childDepth = depth + 1;
              return (
                <CategoryFilterMenuItem
                  key={`${currentItem.name}${currentItem.slug}`}
                  item={currentItem}
                  depth={childDepth}
                  className="px-0 border-t border-skin-base first:border-t-0 mx-[3px] bg-transparent"
                />
              );
            })}
          </ul>
        </li>
      ) : null}
    </>
  );
}

function CategoryFilterMenu({ items, className }: any) {
  return (
    <ul className={cn(className)}>
      {items?.map((item: any) => (
        <CategoryFilterMenuItem
          key={`${item.slug}-key-${item.id}`}
          item={item}
        />
      ))}
    </ul>
  );
}

export default CategoryFilterMenu;
