import BannerCard from "@components/cards/banner-card";
import useWindowSize from "@utils/use-window-size";
import Carousel from "@components/ui/carousel/carousel";
import { SwiperSlide } from "@components/ui/carousel/slider";
import Container from "@components/ui/container";
import Link from "@components/ui/link";

interface Props {
  heroBanner?: any;
  className?: string;
  contentClassName?: string;
}

const BannerHeroGrid: React.FC<Props> = ({
  heroBanner,
  className,
  contentClassName = "py-24",
}) => {
  return (
    <div>
      <Carousel
        pagination={{
          clickable: true,
        }}
        navigation={false}
        autoplay={true}
      >
        <SwiperSlide>
          <Container>
            <div className="relative  lg:h-[416px] h-[216px]  mt-2">
              <img
                src="/images/hero/2.jpg"
                className="shadow rounded-sm object-cover w-full"
                alt="banner-two"
              />
            </div>
          </Container>
        </SwiperSlide>

        <SwiperSlide>
          <Container>
            <div className="relative lg:h-[416px] h-[216px]  mt-2">
              <img
                src="/images/hero/1.jpg"
                className="shadow rounded-sm object-cover w-full"
                alt="banner-three"
              />
            </div>
          </Container>
        </SwiperSlide>
        <SwiperSlide>
          <Container>
            <div className="relative lg:h-[416px] h-[216px]  mt-2">
              <img
                src="/images/hero/banner-1.jpg"
                className="shadow rounded-sm object-cover w-full"
                alt="banner-one"
              />
            </div>
          </Container>
        </SwiperSlide>
      </Carousel>
    </div>
  );
};

export default BannerHeroGrid;
