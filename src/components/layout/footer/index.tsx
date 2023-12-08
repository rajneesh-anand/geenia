import FooterLink from "@components/layout/footer/widget/footer-link";
import Information from "@components/layout/footer/widget/information";
import Payment from "@components/layout/footer/widget/payment";
import Copyright from "@components/layout/footer/widget/copyright";
import { siteSettings } from "@settings/site-settings";

const Footer: React.FC = () => {
  const { footer_links, payments_links, social_links } = siteSettings;
  return (
    <footer className="bg-[#fff7ec] pt-[64px]">
      <Information socials={social_links} />
      <Payment payments={payments_links} />
      <FooterLink links={footer_links} />
      <Copyright />
    </footer>
  );
};

export default Footer;
