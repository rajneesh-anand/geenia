import Scrollbar from "@components/ui/scrollbar";
import { useUI } from "@contexts/ui.context";
import usePrice from "@framework/product/use-price";
import { IoClose } from "react-icons/io5";
import { AiOutlineLogout } from "react-icons/ai";

import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import cn from "classnames";
import { useTranslation } from "next-i18next";
import Heading from "@components/ui/heading";
import Text from "@components/ui/text";
import DeleteIcon from "@components/icons/delete-icon";
import { useUserAuth } from "@contexts/user.context";
import { useModalAction } from "@components/common/modal/modal.context";
import Router from "next/router";
import { useSession, signOut } from "next-auth/react";

export default function mobileAuthMenu() {
  const { t } = useTranslation("common");
  const { data: session, status } = useSession();

  const { closeDrawer } = useUI();

  return (
    <>
      <div className="w-full text-end">
        <button
          className="ml-auto text-2xl px-4 md:px-6 py-6 lg:py-7 hover:opacity-60"
          onClick={closeDrawer}
          aria-label="close"
        >
          <IoClose />
        </button>
      </div>
      <div className="flex flex-col justify-center items-center ">
        <img
          className="rounded-full "
          src={session?.user?.image ?? "/images/placeholder/avatar.svg"}
          width="128"
          height="128"
          alt={session?.user?.name}
        />
        <p className="text-[22px] font-poppins font-semibold mt-4 uppercase ">
          {session?.user?.name}
        </p>
        <hr className="w-full bg-gray-400 my-4 mx-2" />
        <div>
          <ul>
            <li className="px-4 pb-2" onClick={closeDrawer}>
              <Link
                href="/account/profile"
                className="font-medium font-poppins text-[18px]"
              >
                My Profile
              </Link>
            </li>
            <li className="px-4 pb-2" onClick={closeDrawer}>
              <Link
                href="/account/order"
                className="font-medium font-poppins text-[18px]"
              >
                My Orders
              </Link>
            </li>
            <li className="px-4 pb-2">
              <button
                type="button"
                className="font-poppins text-[18px] inline-flex items-center rounded-sm border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => signOut()}
              >
                <AiOutlineLogout
                  className="-ml-1 mr-2 h-5 w-5 text-white"
                  aria-hidden="true"
                />
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
