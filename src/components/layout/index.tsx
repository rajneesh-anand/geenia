import Header from "@components/layout/header";
import Footer from "@components/layout/footer";
import { useTranslation } from "next-i18next";
import MobileNavigation from "@components/layout/mobile-navigation/mobile-navigation";
import { useSessionStorage } from "react-use";
import { IoChevronForwardCircleOutline } from "react-icons/io5";
import HighlightedBar from "@components/common/highlighted-bar";
import Link from "@components/ui/link";
// import "react-whatsapp-widget/dist/index.css";
// import WhatsAppWidget from "react-whatsapp-widget";

type Props = {
  children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const { t } = useTranslation("common");
  const [highlightedBar, setHighlightedBar] = useSessionStorage(
    "topbar",
    "false"
  );
  return (
    <div className="flex flex-col min-h-screen">
      {highlightedBar !== "true" && (
        <HighlightedBar
          onClose={() => setHighlightedBar("true")}
          variant="highlightedTwo"
          className="text-[#460135]"
        >
          <div className="text-sm font-medium py-0.5 pr-6">
            <span>
              {t(
                "35% Exclusive discount plus free next day delivery, excludes sale"
              )}
              <Link
                href="#"
                className="inline-flex text-xs uppercase font-bold pl-1.5 items-center relative transition-all top-[1px] hover:opacity-80"
              >
                <span className="border-b border-[#460135] inline-block pb-0.5">
                  Learn More
                </span>
                <IoChevronForwardCircleOutline className="text-2xl ml-1 relative -top-0.5" />
              </Link>
            </span>
          </div>
        </HighlightedBar>
      )}
      <Header />
      <main
        className="relative flex-grow"
        style={{
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
      </main>
      <Footer />
      {/* <WhatsAppWidget
        phoneNumber="919654774846"
        companyName="Geenia Online Shopping"
        message="How can we help you ?"
      /> */}
      <MobileNavigation />
    </div>
  );
};

export default Layout;
