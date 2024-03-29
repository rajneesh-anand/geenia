import Scrollbar from "@components/ui/scrollbar";
import { useCart } from "@contexts/cart/cart.context";
import { useUI } from "@contexts/ui.context";
import usePrice from "@framework/use-price";
import { IoClose } from "react-icons/io5";
import CartItem from "./cart-item";
import EmptyCart from "./empty-cart";
import cn from "classnames";
import Heading from "@components/ui/heading";
import Text from "@components/ui/text";
import DeleteIcon from "@components/icons/delete-icon";

import { useModalAction } from "@components/common/modal/modal.context";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Cart() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { openModal } = useModalAction();
  const { closeDrawer } = useUI();
  const { items, total, isEmpty, resetCart } = useCart();
  const { price: cartTotal } = usePrice({
    amount: total,
    currencyCode: "INR",
  });

  const handleCheckout = () => {
    closeDrawer();
    if (session) {
      router.push("/checkout");
    } else {
      openModal("LOGIN_VIEW");
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full flex justify-between items-center relative pl-5 md:pl-7 border-b border-skin-base">
        <p className="font-normal font-poppins text-[16px]">Shopping Cart</p>

        <div className="flex items-center">
          {!isEmpty && (
            <button
              className="flex flex-shrink items-center text-15px transition duration-150 ease-in focus:outline-none text-skin-base opacity-50 hover:opacity-100 -me-1.5"
              aria-label="Clear All"
              onClick={resetCart}
            >
              <DeleteIcon />
              <span className="ps-1">Clear All</span>
            </button>
          )}

          <button
            className="flex text-2xl items-center justify-center px-4 md:px-6 py-6 lg:py-7 focus:outline-none transition-opacity text-skin-base hover:opacity-60"
            onClick={closeDrawer}
            aria-label="close"
          >
            <IoClose />
          </button>
        </div>
      </div>
      {!isEmpty ? (
        <Scrollbar className="cart-scrollbar w-full flex-grow">
          <div className="w-full px-5 md:px-7">
            {items?.map((item) => (
              <CartItem item={item} key={item.id} />
            ))}
          </div>
        </Scrollbar>
      ) : (
        <EmptyCart />
      )}
      {!isEmpty && (
        <div className="border-t border-skin-base px-5 md:px-7 pt-5 md:pt-6 pb-5 md:pb-6">
          <div className="flex pb-5 md:pb-7">
            <div className="pe-3">
              <Heading className="mb-2.5">Sub Total:</Heading>
              <Text className="leading-6">
                Final price and discounts will be determined at the time of
                payment processing
              </Text>
            </div>
            <div className="flex-shrink-0 font-semibold text-base md:text-lg text-skin-base -mt-0.5 min-w-[80px] text-end">
              {cartTotal}
            </div>
          </div>
          <div className="flex flex-col">
            {/* <Link
              href={isEmpty === false ? ROUTES.CHECKOUT : "/"}
              className={cn(
                "w-full px-5 py-3 md:py-4 flex items-center justify-center bg-heading rounded font-semibold text-sm sm:text-15px text-skin-inverted bg-skin-primary focus:outline-none transition duration-300 hover:bg-opacity-90",
                {
                  "cursor-not-allowed !text-skin-base !text-opacity-25 bg-skin-button-disable hover:bg-skin-button-disable":
                    isEmpty,
                }
              )}
            >
              <span className="py-0.5">{t("text-proceed-to-checkout")}</span>
            </Link> */}
            <button
              onClick={handleCheckout}
              className={cn(
                "w-full px-5 py-3 md:py-4 flex items-center justify-center bg-heading rounded font-semibold text-sm sm:text-15px text-skin-inverted bg-skin-primary focus:outline-none transition duration-300 hover:bg-opacity-90",
                {
                  "cursor-not-allowed !text-skin-base !text-opacity-25 bg-skin-button-disable hover:bg-skin-button-disable":
                    isEmpty,
                }
              )}
            >
              <span className="py-0.5">Proceed to Checkout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
