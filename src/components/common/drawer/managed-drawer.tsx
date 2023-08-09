import dynamic from "next/dynamic";
import { useUI } from "@contexts/ui.context";
import { Drawer } from "@components/common/drawer/drawer";
import { useRouter } from "next/router";
import { getDirection } from "@utils/get-direction";
const Cart = dynamic(() => import("@components/cart/cart"));

const MobileAuthMenu = dynamic(
  () => import("@components/layout/mobile-navigation/mobile-auth-menu")
);

const ManagedDrawer = () => {
  const { displayDrawer, closeDrawer, drawerView } = useUI();
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const contentWrapperCSS = dir === "ltr" ? { right: 0 } : { left: 0 };

  return (
    <Drawer
      open={displayDrawer}
      placement={dir === "rtl" ? "left" : "right"}
      onClose={closeDrawer}
      handler={false}
      showMask={true}
      level={null}
      contentWrapperStyle={contentWrapperCSS}
    >
      {drawerView === "CART_SIDEBAR" && <Cart />}
      {drawerView === "AUTH_SIDEBAR" && <MobileAuthMenu />}
    </Drawer>
  );
};

export default ManagedDrawer;
