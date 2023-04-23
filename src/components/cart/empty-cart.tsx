import Image from "@components/ui/image";
import { useTranslation } from "next-i18next";
import Text from "@components/ui/text";
import Heading from "@components/ui/heading";

const EmptyCart: React.FC = () => {
  const { t } = useTranslation("common");
  return (
    <div className="flex justify-center flex-col items-center">
      <div className="relative py-4">
        <Image
          src="/images/hero/empty-cart.svg"
          alt={t("text-empty-cart")}
          height={280}
          width={280}
        />
      </div>
      <p className="font-medium"> You have no items in your shopping cart</p>
      <p>Add product to checkout </p>
    </div>
  );
};

export default EmptyCart;
