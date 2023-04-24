import cn from "classnames";
import Image from "@components/ui/image";
import usePrice from "@framework/product/use-price";
// import { Product } from "@framework/types";
import { useModalAction } from "@components/common/modal/modal.context";
import useWindowSize from "@utils/use-window-size";
import PlusIcon from "@components/icons/plus-icon";
import { useCart } from "@contexts/cart/cart.context";
import { AddToCart } from "@components/product/add-to-cart";
import { useTranslation } from "next-i18next";
import { productPlaceholder } from "@assets/placeholders";
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";
import Divider from "@components/ui/divider";

type Product = {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: string;
  sale_price: string;
  category: string;
};

interface ProductProps {
  product: Product;
  className?: string;
}
function RenderPopupOrAddToCart({ data }: { data: Product }) {
  const { id } = data ?? {};
  const { width } = useWindowSize();
  const { openModal } = useModalAction();
  const { isInCart, isInStock } = useCart();
  const iconSize = width! > 1024 ? "19" : "17";
  const outOfStock = isInCart(id) && !isInStock(id);

  return <AddToCart data={data} />;
}
const HomeProductCard: React.FC<ProductProps> = ({ product, className }) => {
  const router = useRouter();
  const { name, image, slug, category } = product ?? {};

  const { t } = useTranslation("common");
  const { price, basePrice, discount } = usePrice({
    amount: Number(product?.sale_price),
    baseAmount: Number(product?.price),
    currencyCode: "INR",
  });

  function navigateToProductPage() {
    router.push(`/${category}/${slug}`);
  }

  return (
    <article
      className={cn(
        "flex flex-col group overflow-hidden bg-gray-100 rounded-md cursor-pointer transition-all duration-300  hover:shadow-cardHover relative h-full",
        className
      )}
      onClick={navigateToProductPage}
      title={name}
    >
      <div className="relative flex-shrink-0">
        <div className="flex overflow-hidden max-w-[230px] mx-auto transition duration-200 ease-in-out transform group-hover:scale-105 relative">
          <Image
            src={image ?? productPlaceholder}
            alt={name || "Product Image"}
            width={230}
            height={300}
            quality={100}
            className="object-cover bg-skin-thumbnail"
          />
        </div>
        <div className="w-full h-full absolute top-0 pt-2.5 md:pt-3.5 px-3 md:px-4 lg:px-[18px] z-10 -mx-0.5 sm:-mx-1">
          {discount && (
            <span className="text-[12px] font-semibold text-skin-inverted uppercase inline-block bg-skin-yellow-three rounded-md px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
              {t("text-on-sale")}
            </span>
          )}
        </div>
        <div className="w-full h-full absolute  top-0 text-right pt-2.5 md:pt-3.5 px-3 md:px-4 lg:px-[18px] z-10 -mx-0.5 sm:-mx-1">
          {discount && (
            <span className="text-[12px] font-semibold text-skin-inverted uppercase inline-block bg-indigo-600 rounded-md px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
              {discount} {t("text-off")}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col px-3 md:px-4 lg:px-[18px] pb-5 lg:pb-6 lg:pt-1.5 h-full">
        <div className="text-center">
          <h3 className="text-skin-base min-h-[44px] text-[11px]  lg:text-[15px] font-normal leading-5 sm:leading-6 mb-1.5">
            {name}
          </h3>
        </div>
        <Divider className="bg-[#5c0f8b] h-[2px]" />
        <div className="flex items-center justify-center py-2">
          {basePrice === price ? (
            <p className="text-[20px] text-skin-base ">{price}</p>
          ) : (
            <>
              <del className="text-[12px] text-skin-base text-opacity-70">
                {basePrice}
              </del>
              <p className="text-[20px] ml-1 text-skin-base ">{price}</p>
            </>
          )}
        </div>

        <div className="mt-1">
          <RenderPopupOrAddToCart data={product} />
        </div>
      </div>
    </article>
  );
};

export default HomeProductCard;
