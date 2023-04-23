import { Table } from "@components/ui/table";
import Input from "@components/ui/form/input";
import { useState } from "react";
import Pagination from "@components/ui/pagination";
import ActionsButton from "@components/ui/action-button";
import { TotalPrice } from "@components/order/price";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import { GrNext, GrPrevious } from "react-icons/gr";
import { BsSearch } from "react-icons/bs";
import Image from "@components/ui/image";

export const CreatedAt: React.FC<{ createdAt?: any }> = ({ createdAt }) => {
  dayjs.extend(relativeTime);
  dayjs.extend(utc);
  dayjs.extend(timezone);
  return (
    <span className="whitespace-nowrap">
      {dayjs.utc(createdAt).tz(dayjs.tz.guess()).fromNow()}
    </span>
  );
};

export const Status: React.FC<{ item?: any }> = ({ item }) => {
  return (
    <span className={item?.status?.name?.replace(/\s/g, "_").toLowerCase()}>
      <span
        className="bullet"
        style={{ backgroundColor: item?.status?.color }}
      />
      {item?.status?.name}
    </span>
  );
};

const OrderTable: React.FC<{ orders?: any }> = ({ orders }) => {
  return (
    <>
      <div className="flex justify-center items-center py-8 mb-4 w-full page-header-banner bg-gradient-to-r from-cyan-100 to-blue-100">
        <h2 className="font-semibold text-sm md:text-xl  uppercase">
          My Orders
        </h2>
      </div>

      {orders?.map((itm: any, idx: number) => {
        return (
          <div key={idx} className="flex flex-col lg:flex-row mb-6">
            <div className="h-auto w-full lg:w-2/3 bg-slate-100">
              {JSON.parse(itm.orderItem).map((data: any, index: number) => {
                return (
                  <div
                    key={index}
                    className={`w-full flex justify-start items-center  px-8 py-4 md:py-7 relative `}
                  >
                    <Image
                      src={data?.image ?? "/placeholder/cart-item.svg"}
                      width={100}
                      height={100}
                      loading="eager"
                      alt={data.name || "Product Image"}
                      className="object-cover"
                    />
                    <div className="pl-3 md:pl-4">
                      <p> {data?.name}</p>

                      <div className="text-13px sm:text-sm text-skin-muted mt-1.5 block mb-2">
                        {data?.unit} X {data?.quantity}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="h-auto w-full lg:w-1/3 bg-white shadow-lg rounded-sm border border-gray-200">
              <div className="overflow-x-auto p-3">
                <div className="text-center mb-2">
                  <span className="bullet">.</span>{" "}
                  <p className="uppercase text-[14px] font-medium text-green-700">
                    Order Status
                  </p>
                  <span className="text-[13px] font-normal text-green-900">
                    <span
                      className="bullet"
                      style={{ backgroundColor: "green" }}
                    />
                    Order accepted &amp; ready for shipment
                  </span>
                </div>
                <table className="table-auto w-full font-poppins">
                  <tbody className="text-sm divide-y divide-gray-100">
                    <tr>
                      <td className="p-2">
                        <h3 className="font-medium text-[12px] lg:text-[14px]">
                          Order Number
                        </h3>
                      </td>
                      <td className="p-2">
                        <h3 className="font-medium text-left text-[12px] lg:text-[14px]">
                          {itm.orderNumber}
                        </h3>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2">
                        <h3 className="font-medium text-[12px] lg:text-[14px]">
                          Order Date
                        </h3>
                      </td>
                      <td className="p-2">
                        <h3 className="font-medium text-left text-[12px] lg:text-[14px]">
                          {dayjs(itm.orderDate).format("MMM D, YYYY")}
                        </h3>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2">
                        <h3 className="font-medium text-[12px] lg:text-[14px]">
                          Amount
                        </h3>
                      </td>
                      <td className="p-2">
                        <h3 className="font-medium text-left text-[12px] lg:text-[14px]">
                          &#x20B9; {itm.amount}
                        </h3>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2">
                        <h3 className="font-medium text-[12px] lg:text-[14px]">
                          Shipping Charge
                        </h3>
                      </td>
                      <td className="p-2">
                        {itm.shipping === "free" ? (
                          <h3 className="font-medium text-left text-[12px] lg:text-[14px] text-green-700">
                            Free Shipping{" "}
                          </h3>
                        ) : (
                          <h3 className="font-medium text-left text-[12px] lg:text-[14px]">
                            &#x20B9; {itm.shipping}
                          </h3>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2">
                        <h3 className="font-semibold text-[14px] lg:text-[18px]">
                          Total Amount
                        </h3>
                      </td>
                      <td className="p-2">
                        <h3 className="font-medium text-left text-[14px] lg:text-[18px] ">
                          &#x20B9; {itm.totalAmount}
                        </h3>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* <ul className="px-8 py-4">
              <li className="flex font-medium text-[12px] lg:text-[14px]">
                <h3>Order Number -</h3>
                <h3 className="ml-2">{itm.orderNumber}</h3>
              </li>
              <li className="flex font-medium text-[12px] lg:text-[14px]">
                <h3>Order Date -</h3>
                <h3 className="ml-2">
                  {dayjs(itm.orderDate).format("MMM D, YYYY")} (
                  <CreatedAt createdAt={itm.orderDate} /> )
                </h3>
              </li>
              <li className="flex font-medium text-[12px] lg:text-[14px]">
                {itm.orderStatus === "Created" && (
                  <>
                    <h3>Order Status - </h3>
                    <p className="text-green-700 font-bold ml-2 ">
                      {" "}
                      Order accepted &amp; ready for shipment
                    </p>
                  </>
                )}
              </li>
            </ul>

            <ul className="px-8 py-4">
              <li className="flex justify-end font-medium text-[12px] lg:text-[14px]">
                <h3>Order Amount =</h3>
                <h3 className="ml-2">&#x20B9;{itm.amount}</h3>
              </li>
              <li className="flex justify-end font-medium text-[12px] lg:text-[14px]">
                <h3>Shipping Amount =</h3>

                {itm.shipping === "free" ? (
                  <h3 className="ml-2 font-semibold font-green-700">
                    {" "}
                    Free Shipping{" "}
                  </h3>
                ) : (
                  <h3 className="ml-2">&#x20B9;{itm.shipping}</h3>
                )}
              </li>
              <li className="flex justify-end font-medium text-[12px] lg:text-[14px]">
                <h3>Total Amount =</h3>
                <h3 className="ml-2">&#x20B9;{itm.totalAmount}</h3>
              </li>
            </ul> */}
          </div>
        );
      })}
    </>
  );
};

export default OrderTable;
