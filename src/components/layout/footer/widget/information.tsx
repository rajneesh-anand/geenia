import Link from "next/link";
import Logo from "@components/ui/logo";
import Text from "@components/ui/text";
import Image from "@components/ui/image";
import { useTranslation } from "next-i18next";

interface Props {
  className?: string;
  socials: {
    id: number;
    path?: string;
    image: string;
    name?: string;
    width: number;
    height: number;
  }[];
}

const Information: React.FC<Props> = ({ className, socials }) => {
  const { t } = useTranslation("footer");
  return (
    <div className="text-center">
      <Logo />
      <div className="flex items-center justify-center mt-4">
        {socials.map((item, index) => (
          <div key={index} className=" mx-2 transition hover:opacity-80">
            <Link href={item.path ? item.path : "/"}>
              <a target="_blank" rel="noreferrer">
                <Image
                  src={item.image}
                  alt={item.name}
                  height={item.height}
                  width={item.width}
                  className="transform scale-85 md:scale-100"
                />
              </a>
            </Link>
          </div>
        ))}
      </div>
      <Text>{t("text-about-us")}</Text>
    </div>
  );
};

export default Information;
