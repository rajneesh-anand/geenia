import Link from "@components/ui/link";
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
    <>
      <div className="text-center">
        <Logo />
        <Text>{t("text-about-us")}</Text>
      </div>
      <div className="flex justify-center mt-4">
        <div className="flex items-center justify-center px-4 py-4 border-y-2 border-y-gray-500 max-w-[420px]">
          {socials.map((item, index) => (
            <Link
              href={item.path ? item.path : "/"}
              key={index}
              className="mx-1 transition hover:opacity-80 social-link-vertical-align"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src={item.image}
                alt={item.name}
                height={item.height}
                width={item.width}
                className="align-middle transform scale-85 md:scale-100 "
              />
            </Link>
          ))}
          <div className="border-l-2 border-l-gray-400 px-2 ml-2">
            <p className="font-medium">+91-750-649-6604</p>
          </div>
        </div>
      </div>
      <div className="text-center pt-1 ">
        <a href="mailto:support@geenia.in" className="font-medium">
          support@geenia.in
        </a>
      </div>
    </>
  );
};

export default Information;
