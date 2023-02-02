import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import cn from "classnames";
import { ROUTES } from "@utils/routes";
import { useUI } from "@contexts/ui.context";
import { siteSettings } from "@settings/site-settings";
import { addActiveScroll } from "@utils/add-active-scroll";
import Container from "@components/ui/container";
import { useUserAuth } from "@contexts/user.context";
import Logo from "@components/ui/logo";
import HeaderMenu from "@components/layout/header/header-menu";
import Search from "@components/common/search";
import LanguageSwitcher from "@components/ui/language-switcher";
import UserIcon from "@components/icons/user-icon";
import SearchIcon from "@components/icons/search-icon";
import { useModalAction } from "@components/common/modal/modal.context";
import useOnClickOutside from "@utils/use-click-outside";
import { FiMenu } from "react-icons/fi";
import Delivery from "@components/layout/header/delivery";
import CategoryDropdownMenu from "@components/category/category-dropdown-menu";
const AuthMenu = dynamic(() => import("./auth-menu"), { ssr: false });
const CartButton = dynamic(() => import("@components/cart/cart-button"), {
  ssr: false,
});

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const { site_header } = siteSettings;

const Header: React.FC = () => {
  const { t } = useTranslation("common");
  const { displaySearch, displayMobileSearch, openSearch, closeSearch } =
    useUI();
  const { isAuthorized, user } = useUserAuth();
  const { openModal } = useModalAction();
  const siteHeaderRef = useRef() as DivElementRef;
  const siteSearchRef = useRef() as DivElementRef;
  const [categoryMenu, setCategoryMenu] = useState(Boolean(false));
  addActiveScroll(siteHeaderRef, 40);
  useOnClickOutside(siteSearchRef, () => closeSearch());
  function handleLogin() {
    openModal("LOGIN_VIEW");
  }
  useEffect(() => {
    console.log(isAuthorized);
    console.log(user);
  }, []);
  function handleCategoryMenu() {
    setCategoryMenu(!categoryMenu);
  }

  return (
    <header
      id="siteHeader"
      ref={siteHeaderRef}
      className={cn(
        "header-five sticky-header sticky top-0 z-20 lg:relative w-full h-16 lg:h-auto",
        displayMobileSearch && "active-mobile-search"
      )}
    >
      <div className="innerSticky w-screen lg:w-full transition-all duration-200 ease-in-out body-font bg-skin-fill z-20">
        <Search
          searchId="mobile-search"
          className="top-bar-search hidden lg:max-w-[600px] absolute z-30 px-4 md:px-6 top-1"
        />

        <Container className="top-bar h-16 lg:h-auto flex items-center justify-between py-1 bg-[#fcfffe]">
          <Logo className="logo -mt-1.5 md:-mt-1 mr-auto ps-3 md:pl-0 md:ml-auto lg:mx-0" />

          <HeaderMenu
            data={site_header.menu}
            className="flex transition-all duration-200 ease-in-out"
          />

          <div className="hidden lg:flex ">
            <CartButton className="flex mr-4" hideLabel={true} />
            <div className="flex-shrink-0 flex items-center ms-3">
              {/* <UserIcon className="text-white text-opacity-90" /> */}
              <AuthMenu
                isAuthorized={isAuthorized}
                href={ROUTES.ACCOUNT}
                btnProps={{
                  children: t("text-sign-in"),
                  onClick: handleLogin,
                }}
              >
                {t("text-account")}
              </AuthMenu>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
