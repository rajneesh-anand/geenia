import FooterLink from "@components/layout/footer/widget/footer-link";
import Information from "@components/layout/footer/widget/information";
import Payment from "@components/layout/footer/widget/payment";
import Copyright from "@components/layout/footer/widget/copyright";
import { footer } from "./data";
const { links, payments, socials } = footer;

const Footer: React.FC = () => (
  <footer className="mt-[50px] lg:mt-14 2xl:mt-16 pt-[64px] bg-blue-100">
    <Information socials={socials} />

    <Payment payments={payments} />
    <FooterLink links={links} />
    <Copyright />
  </footer>
);

export default Footer;
