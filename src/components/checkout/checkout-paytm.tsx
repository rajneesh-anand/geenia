import React, { useEffect, useState } from "react";
import PaytmConfig from "@paytm/config";
import PaytmChecksum from "@paytm/cheksum";
import https from "https";
import Link from "next/link";
import usePrice from "@framework/use-price";
import { useCart } from "@contexts/cart/cart.context";
import Text from "@components/ui/text";
import Button from "@components/ui/button";
import { CheckoutItem } from "@components/checkout/checkout-card-item";
import { CheckoutCardFooterItem } from "./checkout-card-footer-item";
import { useTranslation } from "next-i18next";
import { ROUTES } from "@utils/routes";
import axios, { formToJSON } from "axios";
import { useUserAuth } from "@contexts/user.context";
import Input from "@components/ui/input";
import Select from "@components/ui/form/select/select";
import { statesOptions } from "@data/constant";
import { useForm, Controller } from "react-hook-form";
import Router, { useRouter } from "next/router";
import { useModalAction } from "@components/common/modal/modal.context";
import { useSession } from "next-auth/react";
import TextArea from "@components/ui/form/text-area";

interface FormValues {
  address: string;
  email: string;
  mobile: string;
  pin: string;
  name: string;
  conatct: string;
}

type responseObeject = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

const CheckoutCard: React.FC = () => {
  const { t } = useTranslation("common");
  const { user, isAuthorized } = useUserAuth();
  const { items, total, isEmpty } = useCart();
  const [selectedState, setSelectedState] = useState(statesOptions[0]);
  const [redirect, setRedirect] = useState(false);

  const { data: session } = useSession();

  const [paymentData, setPaymentData] = useState({
    token: "",
    order: "",
    mid: "",
    amount: 100,
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  function stateChange(value: any) {
    setSelectedState(value);
  }

  const makePayment = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_NODE_API}/payment/razorpay/create`,
      { method: "POST" }
    ).then((t) => t.json());

    var options = {
      key: process.env.RAZORPAY_KEY,
      name: "Geenia International Pvt. Ltd.",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thankyou for your placing an order",
      image: "https://manuarora.in/logo.png",
      handler: async function (response: responseObeject) {
        const bodydata = {
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature,
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

        // Validate payment at server - using webhooks is a better idea.
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
      },
      prefill: {
        name: "Manu Arora",
        email: "manuarorawork@gmail.com",
        contact: "9999999999",
      },
    };

    const paymentObject = (window as any).Razorpay(options);
    paymentObject.open();
  };
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

  // useEffect(() => {
  //   initializePayment();
  // }, []);

  // const initializePayment = () => {
  //   let orderDate = new Date();

  //   let orderId = `ORID${orderDate.getFullYear()}${
  //     orderDate.getMonth() + 1
  //   }${orderDate.getDate()}${Math.floor(Math.random() * 100000)}`;

  //   let mid = PaytmConfig.PaytmConfig.mid;
  //   let mkey = PaytmConfig.PaytmConfig.key;

  //   var paytmParams: any = {};

  //   paytmParams.body = {
  //     requestType: "Payment",
  //     mid: mid,
  //     websiteName: PaytmConfig.PaytmConfig.website,
  //     orderId: orderId,
  //     callbackUrl: "http://localhost:3000/account/order",
  //     txnAmount: {
  //       value: 100,
  //       currency: "INR",
  //     },
  //     userInfo: {
  //       custId: session?.user?.email,
  //     },
  //   };

  //   PaytmChecksum.generateSignature(
  //     JSON.stringify(paytmParams.body),
  //     mkey
  //   ).then(function (checksum) {
  //     paytmParams.head = {
  //       signature: checksum,
  //     };

  //     var post_data = JSON.stringify(paytmParams);

  //     var options = {
  //       /* for Staging */
  //       hostname: "securegw-stage.paytm.in",
  //       /* for Production */
  //       // hostname: 'securegw.paytm.in',

  //       port: 443,
  //       path: `/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`,
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Content-Length": post_data.length,
  //       },
  //     };

  //     var response = "";
  //     var post_req = https.request(options, function (post_res) {
  //       post_res.on("data", function (chunk) {
  //         response += chunk;
  //       });
  //       post_res.on("end", function () {
  //         setPaymentData({
  //           ...paymentData,
  //           token: JSON.parse(response).body.txnToken,
  //           order: orderId,
  //           mid: mid,
  //         });
  //       });
  //     });

  //     post_req.write(post_data);
  //     post_req.end();
  //   });
  // };

  // const makePayment = (formData: FormValues) => {
  //   var config = {
  //     root: "",
  //     style: {
  //       bodyBackgroundColor: "#fafafb",
  //       bodyColor: "",
  //       themeBackgroundColor: "#0FB8C9",
  //       themeColor: "#ffffff",
  //       headerBackgroundColor: "#284055",
  //       headerColor: "#ffffff",
  //       errorColor: "",
  //       successColor: "",
  //       card: {
  //         padding: "",
  //         backgroundColor: "",
  //       },
  //     },
  //     data: {
  //       orderId: paymentData.order,
  //       token: paymentData.token,
  //       tokenType: "TXN_TOKEN",
  //       amount: paymentData.amount,
  //     },
  //     payMode: {
  //       labels: {},
  //       filter: {
  //         exclude: [],
  //       },
  //       order: ["CC", "DC", "NB", "UPI", "PPBL", "PPI", "BALANCE"],
  //     },
  //     website: "WEBSTAGING",
  //     flow: "DEFAULT",

  //     handler: {
  //       transactionStatus: async function transactionStatus(
  //         paymentStatus: any
  //       ) {
  //         await axios.post(
  //           `${process.env.NEXT_PUBLIC_NODE_API}/order/neworder`,
  //           JSON.stringify({
  //             name: formData.name,
  //             item: items,
  //             amount: total,
  //             status: paymentStatus,
  //             mobile: formData.mobile,
  //             email: formData.email,
  //             address: formData.address,
  //             pin: formData.pin,
  //           }),
  //           {
  //             headers: {
  //               Accept: "application/json",
  //               "Content-Type": "application/json",
  //             },
  //           }
  //         );
  //         Router.push("/account/order");
  //         window.Paytm.CheckoutJS.close();
  //         // Router.push("/account/order");
  //       },
  //       notifyMerchant: function notifyMerchant(eventName: any, data: any) {
  //         // console.log("Closed");
  //       },
  //     },
  //     merchant: {
  //       mid: paymentData.mid,
  //       redirect: false,
  //     },
  //   };

  //   if (window.Paytm && window.Paytm.CheckoutJS) {
  //     // initialze configuration using init method
  //     window.Paytm.CheckoutJS.init(config)
  //       .then(function onSuccess() {
  //         console.log("Before JS Checkout invoke");
  //         // after successfully update configuration invoke checkoutjs
  //         window.Paytm.CheckoutJS.invoke();
  //       })
  //       .catch(function onError(error: any) {
  //         console.log("Error => ", error);
  //       });
  //   }
  // };

  const { price: subtotal } = usePrice({
    amount: total,
    currencyCode: "INR",
  });
  // function orderHeader() {
  //   !isEmpty && Router.push(ROUTES.ORDER);
  // }
  const checkoutFooter = [
    {
      id: 1,
      name: t("text-sub-total"),
      price: subtotal,
    },
    {
      id: 2,
      name: t("text-shipping"),
      price: "$0",
    },
    {
      id: 3,
      name: t("text-total"),
      price: subtotal,
    },
  ];

  return (
    <div className="border border-skin-base bg-skin-fill rounded-md mt-2">
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

            <div className="w-full mb-3">
              <Input
                type="email"
                variant="outline"
                label="Enter your billing email"
                placeholder="Enter your billing email"
                {...register("email")}
                error={errors.email?.message}
              />
            </div>

            <div className="w-full mb-3">
              <TextArea
                variant="outline"
                label="Your Shiping  Address"
                placeholder="Enter your shipping adress please"
                {...register("address")}
                error={errors.address?.message}
              />
            </div>

            <div className="flex flex-col md:flex-row pb-8 ">
              <div className="w-full md:w-1/2  mb-3">
                <Input
                  variant="outline"
                  type="text"
                  label="Pincode"
                  {...register("pin", {
                    required: "You must provide postal code !",
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
                  {...register("mobile")}
                  error={errors.mobile?.message}
                />
              </div>
            </div>
          </div>
          <div className="md:col-span-3 md:px-8 my-3 md:my-8 lg:border-l lg:border-teal-600">
            <div className="flex py-4 rounded-md text-sm font-semibold text-heading">
              <span className="text-15px text-skin-base font-medium">
                {t("text-product")}
              </span>
              <span className="ml-auto flex-shrink-0 text-15px text-skin-base font-medium ">
                {t("text-sub-total")}
              </span>
            </div>
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
    </div>
  );
};

export default CheckoutCard;
