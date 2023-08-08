import Link from "@components/ui/link";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";

interface Props {
  btnProps: React.ButtonHTMLAttributes<any>;
}

const AuthMenu: React.FC<Props> = ({ btnProps }) => {
  const { data: session, status } = useSession();
  return session ? (
    <Menu
      as="div"
      className="relative inline-flex ml-auto border px-[8px] py-[4px] rounded-sm border-purple-700"
    >
      <Menu.Button className="text-sm font-nunito uppercase rounded-full border-2 border-[#d6934c] text-slate-900 text-opacity-90 font-semibold focus:outline-none ">
        <img
          className="rounded-full border-[#d6934c]"
          src={session?.user?.image ?? "/images/placeholder/avatar.svg"}
          width="28"
          height="28"
          alt={session?.user?.name}
        />

        {/* <div className="flex items-center truncate">
          <span className="truncate ml-2 text-red-900 uppercase text-[12px] font-medium group-hover:text-gray-800">
            My Account
          </span>
          <svg
            className="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div> */}
      </Menu.Button>

      <Transition
        className="origin-top-right z-10 absolute top-full right-0 w-[160px] bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
        enter="transition ease-out duration-200 transform"
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div>
          <ul>
            <li className="font-medium border-b border-gray-200 px-4 py-2">
              <p className="text-[10px] font-medium uppercase text-gray-800">
                {session?.user?.name}
              </p>
            </li>
            <li className="px-4 py-3">
              <Link
                href="/account/profile"
                className="font-medium font-poppins text-[14px] hover:text-indigo-700"
              >
                My Profile
              </Link>
            </li>
            <li className="px-4 pb-3">
              <Link
                href="/account/order"
                className="font-medium font-poppins text-[14px] hover:text-indigo-700"
              >
                My Orders
              </Link>
            </li>
            <li className="px-4 pb-3">
              <button
                className="font-medium font-poppins text-[14px] hover:text-indigo-700"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </Transition>
    </Menu>
  ) : (
    <button
      className="text-sm font-nunito uppercase rounded-full border-2 border-[#d6934c] text-slate-900 text-opacity-90 font-semibold focus:outline-none "
      aria-label="Authentication"
      {...btnProps}
    >
      <img
        className="rounded-full border-[#d6934c]"
        src="/images/placeholder/avatar.svg"
        width="28"
        height="28"
        alt="sign in"
      />
    </button>
  );
};

export default AuthMenu;
