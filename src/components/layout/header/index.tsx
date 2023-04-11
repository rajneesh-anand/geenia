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
        </div>
      </Container>
    </header>
  );
};

export default Header;
