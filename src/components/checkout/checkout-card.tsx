import React, { useEffect, useState } from "react";
import PaytmConfig from "@paytm/config";
import PaytmChecksum from "@paytm/cheksum";
import https from "https";
import Link from "next/link";
import usePrice from "@framework/product/use-price";
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

interface FormValues {
  address: string;
  city: string;
  state: string;
  pin: string;
  fname: string;
  lname: string;
}

const CheckoutCard: React.FC = () => {
  const { t } = useTranslation("common");
  const { user } = useUserAuth();
  const { items, total, isEmpty } = useCart();
  const [selectedState, setSelectedState] = useState(statesOptions[0]);
  const [redirect, setRedirect] = useState(false);

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

  useEffect(() => {
    initializePayment();
  }, []);
  const initializePayment = () => {
    let orderDate = new Date();

    let orderId = `ORID${orderDate.getFullYear()}${
      orderDate.getMonth() + 1
    }${orderDate.getDate()}${Math.floor(Math.random() * 100000)}`;

    let mid = PaytmConfig.PaytmConfig.mid;
    let mkey = PaytmConfig.PaytmConfig.key;

    var paytmParams: any = {};

    paytmParams.body = {
      requestType: "Payment",
      mid: mid,
      websiteName: PaytmConfig.PaytmConfig.website,
      orderId: orderId,
      callbackUrl: "http://localhost:3000/account/order",
      txnAmount: {
        value: 100,
        currency: "INR",
      },
      userInfo: {
        custId: user.mobile ? user.mobile : user.email,
      },
    };

    PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      mkey
    ).then(function (checksum) {
      paytmParams.head = {
        signature: checksum,
      };

      var post_data = JSON.stringify(paytmParams);

      var options = {
        /* for Staging */
        hostname: "securegw-stage.paytm.in",
        /* for Production */
        // hostname: 'securegw.paytm.in',

        port: 443,
        path: `/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": post_data.length,
        },
      };

      var response = "";
      var post_req = https.request(options, function (post_res) {
        post_res.on("data", function (chunk) {
          response += chunk;
        });
        post_res.on("end", function () {
          setPaymentData({
            ...paymentData,
            token: JSON.parse(response).body.txnToken,
            order: orderId,
            mid: mid,
          });
        });
      });

      post_req.write(post_data);
      post_req.end();
    });
  };

  const makePayment = (formData: FormValues) => {
    var config = {
      root: "",
      style: {
        bodyBackgroundColor: "#fafafb",
        bodyColor: "",
        themeBackgroundColor: "#0FB8C9",
        themeColor: "#ffffff",
        headerBackgroundColor: "#284055",
        headerColor: "#ffffff",
        errorColor: "",
        successColor: "",
        card: {
          padding: "",
          backgroundColor: "",
        },
      },
      data: {
        orderId: paymentData.order,
        token: paymentData.token,
        tokenType: "TXN_TOKEN",
        amount: paymentData.amount,
      },
      payMode: {
        labels: {},
        filter: {
          exclude: [],
        },
        order: ["CC", "DC", "NB", "UPI", "PPBL", "PPI", "BALANCE"],
      },
      website: "WEBSTAGING",
      flow: "DEFAULT",

      handler: {
        transactionStatus: async function transactionStatus(
          paymentStatus: any
        ) {
          await axios.post(
            `${process.env.NEXT_PUBLIC_NODE_API}/order/neworder`,
            JSON.stringify({
              user: user,
              item: items,
              amount: total,
              status: paymentStatus,
              address: {
                address: formData.address,
                city: formData.city,
                state: selectedState.value,
                pin: formData.pin,
                firstName: formData.fname,
                lastName: formData.lname,
              },
            }),
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );
          Router.push("/account/order");
          window.Paytm.CheckoutJS.close();
          // Router.push("/account/order");
        },
        notifyMerchant: function notifyMerchant(eventName: any, data: any) {
          console.log("Closed");
        },
      },
      merchant: {
        mid: paymentData.mid,
        redirect: false,
      },
    };

    if (window.Paytm && window.Paytm.CheckoutJS) {
      // initialze configuration using init method
      window.Paytm.CheckoutJS.init(config)
        .then(function onSuccess() {
          console.log("Before JS Checkout invoke");
          // after successfully update configuration invoke checkoutjs
          window.Paytm.CheckoutJS.invoke();
        })
        .catch(function onError(error: any) {
          console.log("Error => ", error);
        });
    }
  };

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

  // const handlePayment = async () => {
  //   try {
  //     const orderData = {
  //       name: "Rajnish",
  //       email: "Rajneesh.k.anand@gmail.com",
  //       mobile: "+919654202690",
  //       amount: "100",
  //       address: "Shstri nagar Delhi",
  //       orderItem: "Book",
  //     };

  //     const response = await fetch("/api/paytm", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(orderData),
  //     });
  //     const result = await response.json();
  //     console.log(result);
  //     setPaytmData({
  //       mid: "zWEMTK89662017572077",
  //       orderId: result.orderId,
  //       txnToken: result.txnToken,
  //     });
  //     if (result.message === "success") {
  //       (document.getElementById("redFrom") as HTMLFormElement).submit();
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="border border-skin-base bg-skin-fill rounded-md">
      <form noValidate>
        <div className="grid grid-cols-1 md:grid-cols-6 md:gap-3">
          <div className="md:col-span-3 md:mx-8 my-3 md:my-8">
            <div className="flex flex-col md:flex-row px-4 pt-8 ">
              <div className="w-full md:w-1/2  mb-3 ">
                <Input
                  type="text"
                  variant="outline"
                  label="First Name"
                  placeholder="Your Name"
                  {...register("fname", {
                    required: "You must provide your first name !",
                  })}
                  error={errors.fname?.message}
                />
              </div>

              <div className="w-full md:w-1/2  mb-3 lg:ml-[4px]">
                <Input
                  type="text"
                  variant="outline"
                  label="Last Name"
                  placeholder="Your Surname"
                  {...register("lname")}
                  error={errors.lname?.message}
                />
              </div>
            </div>
            <div className="w-full mb-3 px-4">
              <Input
                type="text"
                variant="outline"
                label="Delivery Address* "
                placeholder="Enter your full address "
                {...register("address", {
                  required: "You must provide your delivery address !",
                })}
                error={errors.address?.message}
              />
            </div>

            <div className="flex flex-col md:flex-row  px-4 ">
              <div className="w-full md:w-1/2  mb-3 ">
                <Input
                  type="text"
                  variant="outline"
                  label="City"
                  placeholder="Your City/Town Name"
                  {...register("city", {
                    required: "You must provide city / town !",
                  })}
                  error={errors.city?.message}
                />
              </div>

              <div className="w-full md:w-1/2  mb-3 lg:ml-[4px]">
                <label
                  htmlFor="state"
                  className="block mb-3 text-sm font-semibold leading-none text-body-dark"
                >
                  State
                </label>
                <Select
                  id="state"
                  defaultValue={selectedState}
                  options={statesOptions}
                  isSearchable={false}
                  onChange={stateChange}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row pb-8 px-4 ">
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
            </div>
          </div>
          <div className="md:col-span-3 md:px-8 my-3 md:my-8 border-l border-teal-600">
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
              <Link href={ROUTES.PRIVACY}>
                <a className="text-skin-primary underline font-medium">
                  {t("text-privacy")}
                </a>
              </Link>
              . {t("text-credit-debit")}
            </Text>
            <Text className="mt-4">{t("text-bag-fee")}</Text>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutCard;
