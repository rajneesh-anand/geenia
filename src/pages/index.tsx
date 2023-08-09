import Layout from "@components/layout";
import Seo from "@components/seo/seo";
import HomeBanner from "@components/common/banner-hero-grid";
import { HomeProductFilter } from "@components/home/products-filter";

export default function Home() {
  return (
    <>
      <Seo
        title="Organic Beauty Products"
        description="Geenia International is here to serve you better products for you we are in this Industry from many years and continuosly  upgrading products as per the environment"
        path="/"
      />

      <HomeBanner />
      <HomeProductFilter />
    </>
  );
}

Home.Layout = Layout;
