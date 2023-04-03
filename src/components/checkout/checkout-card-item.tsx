import { Item } from "@contexts/cart/cart.utils";
import Image from "@components/ui/image";
import { generateCartItemName } from "@utils/generate-cart-item-name";
import usePrice from "@framework/product/use-price";

export const CheckoutItem: React.FC<{ item: Item }> = ({ item }) => {
  const { price } = usePrice({
    amount: item.itemTotal,
    currencyCode: "INR",
  });
  return (
    <div className="flex py-4 items-center  border-b border-skin-base ">
      <div className="flex border rounded-md border-skin-base  w-16 h-16 flex-shrink-0">
        <Image
          src={item.image ?? "/placeholder/order-product.svg"}
          alt={"item image"}
          className="rounded-md mr-5"
          width={64}
          height={64}
        />
      </div>
      <h6 className="text-15px text-skin-base font-normal pl-3">
        {generateCartItemName(item.name, item.attributes)}
      </h6>
      <div className="flex ml-auto text-15px text-skin-base font-normal  pl-2 flex-shrink-0">
        {price}
      </div>
    </div>
  );
};
