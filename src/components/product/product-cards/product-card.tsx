import cn from "classnames";
import Image from "@components/ui/image";
import usePrice from "@framework/product/use-price";
import { Product } from "@framework/types";
import { useModalAction } from "@components/common/modal/modal.context";
import useWindowSize from "@utils/use-window-size";
import PlusIcon from "@components/icons/plus-icon";
import { useCart } from "@contexts/cart/cart.context";
import { AddToCart } from "@components/product/add-to-cart";
import { useTranslation } from "next-i18next";
import { productPlaceholder } from "@assets/placeholders";
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";

interface ProductProps {
  product: Product;
  className?: string;
}
function RenderPopupOrAddToCart({ data }: { data: Product }) {
  const { t } = useTranslation("common");
  const { id, quantity, product_type } = data ?? {};

  const { width } = useWindowSize();
  const { openModal } = useModalAction();
  const { isInCart, isInStock } = useCart();
  const iconSize = width! > 1024 ? "19" : "17";
  const outOfStock = isInCart(id) && !isInStock(id);
  function handlePopupView() {
    openModal("PRODUCT_VIEW", data);
  }
  if (Number(quantity) < 1 || outOfStock) {
    return (
      <span className="text-[11px] md:text-xs font-bold text-skin-inverted uppercase inline-block bg-skin-red rounded-full px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
        {t("text-out-stock")}
      </span>
    );
  }
  // if (product_type === "variable") {
  //   return (
  //     <button
  //       className="bg-skin-primary rounded-sm h-8  uppercase font-poppins text-[10px] px-4  text-skin-inverted flex items-center justify-center focus:outline-none hover:bg-opacity-90"
  //       aria-label="Count Button"
  //       onClick={handlePopupView}
  //     >
  //       {/* <PlusIcon width={iconSize} height={iconSize} opacity="1" /> */}
  //       Add To Cart
  //     </button>
  //   );
  // }
  return <AddToCart data={data} />;
}
const ProductCard: React.FC<ProductProps> = ({ product, className }) => {
  const router = useRouter();
  const { name, image, unit, slug, product_type } = product ?? {};
  const { openModal } = useModalAction();
  const { t } = useTranslation("common");
  const { price, basePrice, discount } = usePrice({
    amount: product?.sale_price ? product?.sale_price : product?.price,
    baseAmount: product?.price,
    currencyCode: "INR",
  });
  const { price: minPrice } = usePrice({
    amount: product?.min_price ?? 0,
    currencyCode: "INR",
  });
  const { price: maxPrice } = usePrice({
    amount: product?.max_price ?? 0,
    currencyCode: "INR",
  });

  // function handlePopupView() {
  //   openModal("PRODUCT_VIEW", product);
  // }

  function navigateToProductPage() {
    router.push(`${ROUTES.PRODUCT}/${slug}`);
  }

  return (
    <article
      className={cn(
        "flex flex-col group overflow-hidden rounded-md cursor-pointer transition-all duration-300  hover:shadow-cardHover relative h-full",
        className
      )}
      onClick={navigateToProductPage}
      title={name}
    >
      <div className="relative flex-shrink-0">
        <div className="flex overflow-hidden max-w-[230px] mx-auto transition duration-200 ease-in-out transform group-hover:scale-105 relative">
          <Image
            src={image?.thumbnail ?? productPlaceholder}
            alt={name || "Product Image"}
            width={230}
            height={320}
            quality={100}
            className="object-cover bg-skin-thumbnail"
          />
        </div>
        <div className="w-full h-full absolute top-0 pt-2.5 md:pt-3.5 px-3 md:px-4 lg:px-[18px] z-10 -mx-0.5 sm:-mx-1">
          {discount && (
            <span className="text-[10px] font-semibold text-skin-inverted uppercase inline-block bg-skin-yellow-three rounded-full px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
              {t("text-on-sale")}
            </span>
          )}
        </div>
        <div className="w-full h-full absolute  top-0 text-right pt-2.5 md:pt-3.5 px-3 md:px-4 lg:px-[18px] z-10 -mx-0.5 sm:-mx-1">
          {discount && (
            <span className="inline-block text-[12px] font-poppins font-medium text-rose-700 px-2 py-1 ml-2.5">
              {discount} {t("text-off")}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col px-3 md:px-4 lg:px-[18px] pb-5 lg:pb-6 lg:pt-1.5 h-full">
        <h2 className="text-skin-base min-h-[44px] text-11px  lg:text-15px font-semibold font-poppins leading-5 sm:leading-6 mb-1.5">
          {name}
        </h2>

        <div className="flex justify-between items-center mt-2 ">
          <div>
            <span className="inline-block font-semibold text-[13px] lg:text-[18px] text-skin-base">
              {product_type === "variable"
                ? `${minPrice} - ${maxPrice}`
                : price}
            </span>
            {basePrice && (
              <del className="text-[10px] ml-1 text-skin-base text-opacity-70">
                {basePrice}
              </del>
            )}
          </div>
          <div className="product-count-button-position">
            <RenderPopupOrAddToCart data={product} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
