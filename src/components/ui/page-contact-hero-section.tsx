import { useTranslation } from "react-i18next";
import { Attachment } from "@framework/types";

interface HeaderProps {
  heroTitle?: string;
  heroDescription?: string;
  backgroundThumbnail?: Attachment;
}

const PageContactHeroSection: React.FC<HeaderProps> = ({
  heroTitle = "text-contact-page-header",
  heroDescription = "text-contact-page-explore",
  backgroundThumbnail = "/images/hero/contact-page-banner.png",
}) => {
  const { t } = useTranslation("common");
  return (
    <div
      className="lg:min-h-[370px] 2xl:min-h-[455px] lg:py-0 h-auto pt-10 md:pt-14 pb-20 md:pb-24 flex lg:items-center bg-cover lg:bg-cover bg-left sm:bg-top lg:bg-center bg-no-repeat border-t border-skin-base"
      style={{
        backgroundImage: `url(${backgroundThumbnail})`,
      }}
    >
      <div className="w-full max-w-[1484px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="sm:max-w-xs md:max-w-sm lg:max-w-xl lg:pb-5">
          <h2 className="font-poppins leading-7 md:leading-snug lg:leading-snug sm:text-2xl md:text-3xl 3xl:text-4xl 3xl:leading-snug text-skin-base tracking-tight mb-2.5 md:pr-6 ">
            {t(heroTitle)}
          </h2>
          <h3 className="font-poppins leading-7 md:leading-snug lg:leading-snug sm:text-xl md:text-2xl 3xl:text-3xl 3xl:leading-snug text-skin-base tracking-tight mb-2.5 md:pr-6 ">
            {t("text-contact-page-header-two")}
          </h3>
          {/* <p className="text-15px lg:text-base xl:text-[17px] leading-7 lg:leading-8 xl:leading-9 text-skin-base text-opacity-60 lg:pr-14">
            {t(heroDescription)}
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default PageContactHeroSection;
