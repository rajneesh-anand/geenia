import Counter from "@components/ui/counter";
import { useCart } from "@contexts/cart/cart.context";
import { generateCartItem } from "@utils/generate-cart-item";
import PlusIcon from "@components/icons/plus-icon";
import useWindowSize from "@utils/use-window-size";

interface Props {
  data: any;
  variation?: any;
  disabled?: boolean;
}

export const AddToCart = ({ data, variation, disabled }: Props) => {
  const { width } = useWindowSize();
  const {
    addItemToCart,
    removeItemFromCart,
    isInStock,
    getItemFromCart,
    isInCart,
  } = useCart();
  const item = generateCartItem(data!, variation);
  const handleAddClick = (
    e: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    e.stopPropagation();

    addItemToCart(item, 1);
  };
  const handleRemoveClick = (e: any) => {
    e.stopPropagation();
    removeItemFromCart(item.id);
  };
  const outOfStock = isInCart(item?.id) && !isInStock(item.id);
  const iconSize = width! > 480 ? "19" : "17";
  return !isInCart(item?.id) ? (
    <button
      className="bg-skin-primary rounded-sm h-8  uppercase font-poppins text-[10px] px-4  text-skin-inverted flex items-center justify-center focus:outline-none"
      aria-label="Count Button"
      onClick={handleAddClick}
      disabled={disabled || outOfStock}
    >
      {/* <PlusIcon width={iconSize} height={iconSize} opacity="1" /> */}
      Add to Cart
    </button>
  ) : (
    <Counter
      value={getItemFromCart(item.id).quantity}
      onDecrement={handleRemoveClick}
      onIncrement={handleAddClick}
      disabled={outOfStock}
    />
  );
};
