import { useTranslation } from "next-i18next";
import { Attachment } from "@framework/types";
import useWindowSize from "@utils/use-window-size";
import Breadcrumb from "@components/ui/breadcrumb";
import cn from "classnames";

interface HeaderProps {
  backgroundThumbnail?: Attachment | string;
  heroTitle?: string;
  mobileBackgroundThumbnail?: Attachment | string;
  variant?: "default" | "white";
}

const PageHeroSection: React.FC<HeaderProps> = ({
  backgroundThumbnail = "/images/hero/page-hero-bg.webp",
  heroTitle = "text-page-title",
  mobileBackgroundThumbnail = "/images/hero/page-hero-bg-mobile.png",
  variant = "default",
}) => {
  const { t } = useTranslation("common");
  const { width } = useWindowSize();
  return (
    // <div
    //   className={cn(
    //     "flex justify-center md:min-h-[250px] lg:min-h-[288px] py-20 w-full bg-cover bg-no-repeat bg-center page-header-banner",
    //     {
    //       "style-variant-white": variant === "white",
    //     }
    //   )}
    //   style={{
    //     backgroundImage: `url(${
    //       width! > 480 ? backgroundThumbnail : mobileBackgroundThumbnail
    //     })`,
    //   }}
    // >
    <div
      className={cn(
        "flex justify-center md:min-h-[250px] lg:min-h-[288px] py-20 w-full page-header-banner bg-gradient-to-r from-cyan-100 to-blue-100",
        {
          "style-variant-white": variant === "white",
        }
      )}
    >
      <div className="w-full flex flex-col items-center justify-center relative">
        <h2
          className={cn(
            "text-xl md:text-2xl lg:text-3xl 2xl:text-[40px]  text-center",
            {
              "text-skin-base": variant === "default",
              "text-skin-inverted": variant === "white",
            }
          )}
        >
          <span className="font-poppins block  mb-3 md:mb-4 lg:mb-5 2xl:mb-7 ">
            {t(heroTitle)}
          </span>
        </h2>
        <Breadcrumb />
      </div>
    </div>
  );
};

export default PageHeroSection;
