import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useUI } from "@contexts/ui.context";
import { siteSettings } from "@settings/site-settings";
import { addActiveScroll } from "@utils/add-active-scroll";
import Container from "@components/ui/container";
import Logo from "@components/ui/logo";
import HeaderMenu from "@components/layout/header/header-menu";
import { useModalAction } from "@components/common/modal/modal.context";
import useOnClickOutside from "@utils/use-click-outside";
import Searchform from "./search-form";
const AuthMenu = dynamic(() => import("./auth-menu"), { ssr: false });
const CartButton = dynamic(() => import("@components/cart/cart-button"), {
  ssr: false,
});

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const { site_header } = siteSettings;

const Header: React.FC = () => {
  const { closeSearch } = useUI();
  const { openModal } = useModalAction();
  const siteHeaderRef = useRef() as DivElementRef;
  const siteSearchRef = useRef() as DivElementRef;

  addActiveScroll(siteHeaderRef, 40);
  useOnClickOutside(siteSearchRef, () => closeSearch());
  function handleLogin() {
    openModal("LOGIN_VIEW");
  }

  return (
    <header
      ref={siteHeaderRef}
      className="sticky-header lg:relative w-full h-auto bg-[#fff7ec]"
    >
      <Container className="navbar flex items-center py-2 lg:py-0 border-b border-slate-200">
        <Logo />
        <HeaderMenu data={site_header.menu} />
        <Searchform />
        <div className="hidden lg:flex ml-auto">
          <CartButton className="flex mr-4" hideLabel={true} />
          <AuthMenu
            btnProps={{
              onClick: handleLogin,
            }}
          />
        </div>
      </Container>
    </header>
  );
};

export default Header;

// <div
// className={`menuItem group cursor-pointer py-1.5 mx-3 xl:mx-4  ${
//   item.subMenu ? "relative" : ""
// }`}
// key={item.id}
// >
// <Link
//   href={item.path}
//   className="inline-flex uppercase font-nunito font-semibold items-center text-[12px] text-sky-800 py-2  relative group-hover:text-sky-900"
// >
//   {t(item.label)}
//   {(item?.columns || item.subMenu) && (
//     <span className="text-xs mt-1 xl:mt-0.5 w-4 flex justify-end text-skin-base opacity-40 group-hover:text-skin-primary">
//       <FaChevronDown className="transition duration-300 ease-in-out transform group-hover:-rotate-180" />
//     </span>
//   )}
// </Link>

// {item?.subMenu && Array.isArray(item.subMenu) && (
//   <div className="subMenu shadow-dropDown z-30 absolute start-0 bg-gray-100 opacity-100 rounded-md">
//     <div className="grid grid-cols-2 gap-4 py-8">
//       {item.subMenu.map((menu: any, index: number) => {
//         return (
//           <Link
//             href={menu.path}
//             className="pt-2 pl-4 text-[12.5px] font-medium hover:font-semibold hover:text-rose-700"
//           >
//             {t(menu.label)}
//           </Link>
//         );
//       })}
//     </div>
//     {/* <ul className="text-body text-sm py-5">
//       {item.subMenu.map((menu: any, index: number) => {
//         const dept: number = 1;
//         const menuName: string = `sidebar-menu-${dept}-${index}`;
//         return (
//           <ListMenu
//             dept={dept}
//             data={menu}
//             hasSubMenu={menu.subMenu}
//             menuName={menuName}
//             key={menuName}
//             menuIndex={index}
//           />
//         );
//       })}
//     </ul> */}
//   </div>
// )}
// </div>
// ))}
// </ul>
