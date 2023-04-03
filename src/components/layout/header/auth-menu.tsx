import Link from "@components/ui/link";
import React from "react";
import { FiChevronDown } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";

interface Props {
  btnProps: React.ButtonHTMLAttributes<any>;
}

const AuthMenu: React.FC<Props> = ({ btnProps }) => {
  const { data: session, status } = useSession();
  return session ? (
    <Menu as="div" className="relative inline-flex ml-auto">
      <Menu.Button className="inline-flex justify-center items-center group">
        <img
          className="w-8 h-8 rounded-full"
          src={session?.user?.image ?? "/images/avatar.svg"}
          width="32"
          height="32"
          alt="profile image"
        />
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-red-900 uppercase text-[12px] font-medium group-hover:text-gray-800">
            My Account
          </span>
          <svg
            className="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </Menu.Button>

      <Transition
        className="origin-top-right z-10 absolute top-full right-0 w-[132px] bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
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
              <p className="text-[10px] font-semibold uppercase text-gray-800">
                {session?.user?.name}
              </p>
            </li>
            <li className="px-4 pb-2">
              <Link href="/account/profile">Profile</Link>
            </li>
            <li className="px-4 pb-2">
              <Link href="/account/order">My Orders</Link>
            </li>
            <li className="px-4 pb-2">
              <button onClick={() => signOut()}>Sign Out</button>
            </li>
          </ul>
        </div>
      </Transition>
    </Menu>
  ) : (
    <button
      className="text-sm font-nunito uppercase lg:text-[12.5px] text-slate-900 text-opacity-90 font-semibold focus:outline-none ml-2 px-3 py-1.5 border rounded-sm border-emerald-700"
      aria-label="Authentication"
      {...btnProps}
    >
      Sign In
    </button>
  );
};

export default AuthMenu;

// import Link from "@components/ui/link";
// import React from "react";

// interface Props {
//   href: string;
//   btnProps: React.ButtonHTMLAttributes<any>;
//   isAuthorized: boolean;
//   children: React.ReactNode;
// }

// const AuthMenu: React.FC<Props> = ({
//   isAuthorized,
//   href,
//   btnProps,
//   children,
// }) => {
//   return isAuthorized ? (
//     <Link
//       href={href}
//       className="text-sm font-nunito uppercase lg:text-[12.5px] text-slate-900 text-opacity-90 font-semibold focus:outline-none ml-2 px-3 py-1.5 border rounded-sm border-emerald-700"
//     >
//       {children}
//     </Link>
//   ) : (
//     <button
//       className="text-sm font-nunito uppercase lg:text-[12.5px] text-slate-900 text-opacity-90 font-semibold focus:outline-none ml-2 px-3 py-1.5 border rounded-sm border-emerald-700"
//       aria-label="Authentication"
//       {...btnProps}
//     />
//   );
// };

// export default AuthMenu;
