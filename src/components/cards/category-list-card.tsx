import Link from "next/link";
import Image from "@components/ui/image";
import { IoIosArrowForward } from "react-icons/io";
import { Category } from "@framework/types";
import cn from "classnames";
import { useTranslation } from "next-i18next";
import { LinkProps } from "next/link";

interface Props {
  category: Category;
  href: LinkProps["href"];
  className?: string;
  variant?: "default" | "small";
}

const CategoryListCard: React.FC<Props> = ({
  category,
  className,
  href,
  variant = "default",
}) => {
  const { name, icon } = category;
  const { t } = useTranslation("common");
  return (
    <Link href={href}>
      <a
        className={cn(
          "group flex justify-between items-center px-3.5 2xl:px-4 transition",
          {
            "py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3": variant === "default",
            "py-2 3xl:py-3": variant === "small",
          },
          className
        )}
      >
        <div className="flex items-center">
          <div
            className={cn("inline-flex flex-shrink-0 w-9 h-9", {
              "2xl:w-12 3xl:w-auto 2xl:h-12 3xl:h-auto": variant === "default",
            })}
          >
            <Image
              src={icon ?? "/placeholder/category-small.svg"}
              alt={name || t("text-category-thumbnail")}
              width={40}
              height={40}
            />
          </div>
          <h3 className="text-15px text-skin-base capitalize ps-2.5 md:ps-4 2xl:ps-3 3xl:ps-4">
            {name}
          </h3>
        </div>
        <div className="flex items-center transition-all transform group-hover:translate-x-1">
          <IoIosArrowForward className="text-base text-skin-base text-opacity-40" />
        </div>
      </a>
    </Link>
  );
};

export default CategoryListCard;
