import React, { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import usePrice from "@framework/product/use-price";
import { useCart } from "@contexts/cart/cart.context";
import Text from "@components/ui/text";
import Button from "@components/ui/button";
import { CheckoutItem } from "@components/checkout/checkout-card-item";
import { CheckoutCardFooterItem } from "./checkout-card-footer-item";
import { useTranslation } from "next-i18next";
import { ROUTES } from "@utils/routes";
import Input from "@components/ui/input";
import { useForm, Controller } from "react-hook-form";
import Router, { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import TextArea from "@components/ui/form/text-area";
import { toast } from "react-toastify";
import { shippingData } from "@data/shipping";

interface FormValues {
  address: string;
  mobile: string;
  pin: string;
  name: string;
  contact: string;
  description: string;
}

type responseObeject = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

const CheckoutCard: React.FC = () => {
  const { t } = useTranslation("common");
  const [error, setError] = useState<string>("");
  const [pinError, setPinError] = useState<boolean>(false);
  const [processingStatus, setProcessingStatus] = useState<boolean>(false);
  const [shippingCharge, setShippingCharge] = useState<string>("0");
  const { items, total, isEmpty, resetCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const shipping = total > 500 ? 0 : 99;

  const { price: subtotal } = usePrice({
    amount: total,
    currencyCode: "INR",
  });

  const { price: shippingAmount } = usePrice({
    amount: shipping,
    currencyCode: "INR",
  });

  const { price: totalAmount } = usePrice({
    amount: Math.round(total + shipping),
    currencyCode: "INR",
  });

  useEffect(() => {
    if (error === "failed") {
      toast.error("Payment failed , try again !", {
        progressClassName: "fancy-progress-bar",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, []);

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const makePayment = async (formData: FormValues) => {
    setProcessingStatus(true);
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    const data = await fetch(
      `${process.env.NEXT_PUBLIC_NODE_API}/payment/razorpay/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          item: items,
          discount: "0",
          mobile: formData.mobile,
          email: session?.user?.email,
          address: formData.address,
          pincode: formData.pin,
          description: formData.description,
        }),
      }
    ).then((t) => t.json());
    let orderNumber = data.orderNumber;
    var options = {
      key: process.env.RAZORPAY_KEY,
      name: "Geenia International Pvt. Ltd.",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thank you for placing an order",
      image: `${process.env.NEXT_PUBLIC_SITE_URL}/images/logo.jpg`,
      handler: async function (response: responseObeject) {
        setProcessingStatus(false);
        const bodydata = {
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature,
          orderNumber: orderNumber,
        };
        const data = await fetch(
          `${process.env.NEXT_PUBLIC_NODE_API}/payment/razorpay/verify`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bodydata),
          }
        ).then((t) => t.json());

        if (data.message === "success") {
          resetCart();
          router.push("/account/order");
        } else {
          setError("failed");
        }
      },
      prefill: {
        name: " ",
        email: "",
        contact: "",
      },
    };

    const paymentObject = (window as any).Razorpay(options);
    paymentObject.open();
  };

  // const handleShippingCharge = (e: ChangeEvent<HTMLInputElement>) => {
  //   // const pincode = e.target.value;
  //   // const ship = shippingData.find((item) => item.pincode === Number(pincode));

  //   if (total > 500) {
  //     setShippingCharge("0");
  //   } else {
  //     setShippingCharge("99");
  //   }
  // };

  const checkoutFooter = [
    {
      id: 1,
      name: t("text-sub-total"),
      price: subtotal,
    },
    {
      id: 2,
      name: t("text-shipping"),
      price: total > 500 ? "free" : shippingAmount,
    },
    {
      id: 3,
      name: t("text-total"),
      price: totalAmount,
    },
  ];

  return (
    <div>
      {isEmpty ? (
        <h1>No Data</h1>
      ) : (
        <form noValidate>
          <div className="grid grid-cols-1 md:grid-cols-6 md:gap-3 px-4 ">
            <div className="md:col-span-3 md:mx-8 my-3 md:my-8">
              <h3 className="font-semibold uppercase text-red-900 py-4">
                Shipping Information
              </h3>
              <div className="w-full mb-3 ">
                <Input
                  type="text"
                  variant="outline"
                  label="Enter your full name"
                  placeholder="Enter your full name "
                  {...register("name", {
                    required: "You must provide your name !",
                  })}
                  error={errors.name?.message}
                />
              </div>

              {/* <div className="w-full mb-3">
              <Input
                type="email"
                variant="outline"
                label="Enter your billing email"
                placeholder="Enter your billing email"
                {...register("email")}
                error={errors.email?.message}
              />
            </div> */}

              <div className="w-full mb-3">
                <TextArea
                  variant="outline"
                  label="Your Shiping  Address"
                  placeholder="Enter your detailed shipping address "
                  {...register("address", {
                    required: "shipping address is required !",
                  })}
                  error={errors.address?.message}
                />
              </div>

              <div className="flex flex-col md:flex-row pb-8 ">
                <div className="w-full md:w-1/2  mb-3">
                  <Input
                    type="text"
                    variant="outline"
                    label="PIN/ZIP Code"
                    {...register("pin", {
                      required: "pincode is required !",
                    })}
                    error={errors.pin?.message}
                  />
                </div>
                <div className="w-full md:w-1/2  mb-3 lg:ml-[4px]">
                  <Input
                    type="text"
                    variant="outline"
                    label="Contact Number"
                    placeholder="Enter your mobile number"
                    {...register("mobile", {
                      required: "contact number is required !",
                    })}
                    error={errors.mobile?.message}
                  />
                </div>
              </div>
            </div>
            <div className="md:col-span-3 md:px-8 my-3 md:my-8 lg:border-l lg:border-[#F98F14]">
              {/* <div className="flex py-4 rounded-md text-sm font-semibold text-heading">
                <span className="text-15px text-skin-base font-medium">
                  {t("text-product")}
                </span>
                <span className="ml-auto flex-shrink-0 text-15px text-skin-base font-medium ">
                  {t("text-sub-total")}
                </span>
              </div> */}
              {!isEmpty ? (
                items.map((item) => <CheckoutItem item={item} key={item.id} />)
              ) : (
                <p className="text-skin-red text-opacity-70 py-4">
                  {t("text-empty-cart")}
                </p>
              )}
              {checkoutFooter.map((item: any) => (
                <CheckoutCardFooterItem item={item} key={item.id} />
              ))}
              <Button
                variant="formButton"
                className={`w-full mt-8 mb-5 bg-skin-primary text-skin-inverted rounded font-semibold px-4 py-3 transition-all ${
                  isEmpty && "opacity-40 cursor-not-allowed"
                }`}
                loading={processingStatus}
                onClick={handleSubmit(makePayment)}
              >
                {t("button-order-now")}
              </Button>
              <Text className="mt-8">
                {t("text-by-placing-your-order")}{" "}
                <Link href={ROUTES.TERMS}>
                  <a className="text-skin-primary underline font-medium">
                    {t("text-terms-of-service")}{" "}
                  </a>
                </Link>
                {t("text-and")}{" "}
                <Link href={ROUTES.RETURN}>
                  <a className="text-skin-primary underline font-medium">
                    {t("text-privacy")}
                  </a>
                </Link>
                {/* . {t("text-credit-debit")} */}
              </Text>
              {/* <Text className="mt-4">{t("text-bag-fee")}</Text> */}
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default CheckoutCard;
