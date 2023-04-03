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

  function handleCategoryMenu() {
    setCategoryMenu(!categoryMenu);
  }

  return (
    <header
      id="siteHeader"
      ref={siteHeaderRef}
      className="sticky-header lg:relative w-full h-auto"
    >
      <Container className="navbar flex items-center justify-center lg:justify-between border-b border-slate-200">
        <Logo />

        <HeaderMenu
          data={site_header.menu}
          className="flex transition-all duration-200 ease-in-out"
        />

        <div className="hidden lg:flex">
          <CartButton className="flex mr-4" hideLabel={true} />
          <AuthMenu
            btnProps={{
              onClick: handleLogin,
            }}
          />
          {/* <AuthMenu
            isAuthorized={isAuthorized}
            href={ROUTES.ACCOUNT}
            btnProps={{
              children: t("text-sign-in"),
              onClick: handleLogin,
            }}
          >
            {t("text-account")}
          </AuthMenu> */}
        </div>
      </Container>
    </header>
  );
};

export default Header;
