import usePrice from "@framework/use-price";
import { useModalAction } from "@components/common/modal/modal.context";
import useWindowSize from "@utils/use-window-size";
import PlusIcon from "@components/icons/plus-icon";
import { useCart } from "@contexts/cart/cart.context";
import { AddToCart } from "@components/product/add-to-cart";
import { useTranslation } from "next-i18next";
import { productPlaceholder } from "@assets/placeholders";
import { useRouter } from "next/router";
import Divider from "@components/ui/divider";
import { Product } from "@framework/types";

interface ProductProps {
  product: Product;
  className?: string;
}
function RenderPopupOrAddToCart({ data }: { data: Product }) {
  const { id, quantity_in_stock } = data ?? {};
  const { isInCart, isInStock } = useCart();
  const outOfStock = isInCart(id) && !isInStock(id);

  if (Number(quantity_in_stock) < 1 || outOfStock) {
    return (
      <span className="text-[11px] md:text-xs font-bold text-skin-inverted uppercase inline-block bg-skin-red rounded-full px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
        Out Of Stock
      </span>
    );
  }

  return <AddToCart data={data} />;
}
const ProductCard: React.FC<ProductProps> = ({ product, className }) => {
  console.log(product);
  const router = useRouter();
  const { name, image, unit, category, slug, new_arrival } = product ?? {};

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
      className="relative mt-2 w-full max-w-xs overflow-hidden rounded-lg bg-white cursor-pointer border border-slate-200 "
      onClick={navigateToProductPage}
      title={name}
    >
      <img
        src={image ?? productPlaceholder}
        alt={name || "Product Image"}
        className="h-60 rounded-t-lg object-cover"
      />

      {discount && (
        <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-[#800080] text-center text-sm text-white">
          Sale
        </span>
      )}

      {new_arrival === "yes" && (
        <div className="absolute right-0 top-0 h-16 w-16">
          <span className="absolute left-[-34px] top-[32px] w-[170px] transform rotate-90 bg-yellow-500 text-center text-white font-medium py-1">
            New Arrival
          </span>
        </div>
      )}

      <div className="mt-4 px-5 pb-5">
        <h5
          className="text-md font-medium tracking-tight text-slate-700 cursor-pointer"
          onClick={navigateToProductPage}
        >
          {name}
        </h5>

        <Divider className="bg-skin-yellow-three h-[2px] mt-4 mb-2" />

        <div className="flex items-center justify-center">
          {basePrice === price ? (
            <span className="text-2xl font-semibold text-slate-900">
              {price}
            </span>
          ) : (
            <p>
              <span className="text-2xl font-semibold text-slate-900 mr-2">
                {price}
              </span>
              <span className="text-sm text-slate-900 line-through">
                {basePrice}
              </span>
            </p>
          )}
        </div>
        <div className="flex justify-center mt-2">
          <RenderPopupOrAddToCart data={product} />
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
