import { useState } from "react";
import Button from "@components/ui/button";
import { useRouter } from "next/router";
import useWindowSize from "@utils/use-window-size";
import usePrice from "@framework/use-price";
import { useCart } from "@contexts/cart/cart.context";
import { generateCartItem } from "@utils/generate-cart-item";
import { toast } from "react-toastify";
import ThumbnailCarousel from "@components/ui/carousel/thumbnail-carousel";
import Image from "@components/ui/image";
import CartIcon from "@components/icons/cart-icon";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import TagLabel from "@components/ui/tag-label";
import LabelIcon from "@components/icons/label-icon";
import { IoArrowRedoOutline } from "react-icons/io5";
import SocialShareBox from "@components/ui/social-share-box";
import ProductDescriptionTab from "@components/product/product-detail/product-description-tab";

type Product = {
  id: string;
  name: string;
  slug: string;
  image: string;
  gallery: string;
  description: string;
  price: string;
  sale_price: string;
  unit: string;
  quantity_in_stock: string;
  tags: string;
  category: string;
  product_detailed_description?: string;
};

interface ProductProps {
  className?: string;
  product: Product;
}

const ProductDetail: React.FC<ProductProps> = ({ product }) => {
  console.log(product);
  const router = useRouter();
  const ImageArray = product.gallery;
  const { width } = useWindowSize();

  const { addItemToCart, isInCart, isInStock } = useCart();

  const [favorite, setFavorite] = useState<boolean>(false);
  const [quantity, setQuantity] = useState(1);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [addToWishlistLoader, setAddToWishlistLoader] =
    useState<boolean>(false);
  const [shareButtonStatus, setShareButtonStatus] = useState<boolean>(false);
  const productUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${
    router.pathname.split("/")[1]
  }/${router.query.slug}`;

  const { price, basePrice, discount } = usePrice(
    product && {
      amount: Number(product.sale_price)
        ? Number(product.sale_price)
        : Number(product.price),
      baseAmount: Number(product.price),
      currencyCode: "INR",
    }
  );
  const handleChange = () => {
    setShareButtonStatus(!shareButtonStatus);
  };

  const item = generateCartItem(product!);
  const outOfStock = isInCart(item.id) && !isInStock(item.id);
  function addToCart() {
    // if (!isSelected) return;
    // to show btn feedback while product carting
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
    }, 1500);

    const item = generateCartItem(product!);

    addItemToCart(item, quantity);
    toast("Item added to cart", {
      progressClassName: "fancy-progress-bar",
      position: width! > 768 ? "bottom-right" : "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  function addToWishlist() {
    setAddToWishlistLoader(true);
    setFavorite(!favorite);
    const toastStatus: string =
      favorite === true ? "Remove Favorite" : "Add to wishlist";
    setTimeout(() => {
      setAddToWishlistLoader(false);
    }, 1500);
    toast(toastStatus, {
      progressClassName: "fancy-progress-bar",
      position: width! > 768 ? "bottom-right" : "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  return (
    <div className="pt-6 md:pt-7 pb-2">
      <div className="lg:grid grid-cols-10 gap-2 2xl:gap-4">
        <div className="col-span-5 xl:col-span-5 overflow-hidden mb-6 md:mb-8 lg:mb-0">
          {!!product?.gallery?.length ? (
            <ThumbnailCarousel
              gallery={product?.gallery}
              thumbnailClassName="xl:w-[700px] 2xl:w-[900px]"
              galleryClassName="xl:w-[150px] 2xl:w-[170px]"
            />
          ) : (
            <div className="w-auto flex items-center justify-center">
              <Image
                src={ImageArray[0] ?? "/images/placeholder/product.svg"}
                alt={product?.name!}
                width={900}
                height={680}
              />
            </div>
          )}
        </div>

        <div className="flex-shrink-0 flex flex-col col-span-5 xl:col-span-5 xl:pl-2">
          <div className="pb-3 lg:pb-5">
            <div className="md:mb-2.5 block -mt-1.5">
              <h2 className="text-skin-base text-lg md:text-xl xl:text-2xl font-medium transition-colors duration-300">
                {product?.name}
              </h2>
            </div>

            <div className="text-sm md:text-15px font-medium">
              {product?.unit}
            </div>

            <div className="flex items-center mt-5">
              <div className="text-skin-base font-bold text-base md:text-xl xl:text-[22px]">
                {price}
              </div>
              {discount && (
                <>
                  <del className="text-sm md:text-15px pl-3 text-skin-base text-opacity-50">
                    {basePrice}
                  </del>
                  <span className="inline-block rounded font-bold text-xs md:text-sm bg-skin-tree bg-opacity-20 text-skin-tree uppercase px-2 py-1 ml-2.5">
                    {discount} Off
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="pb-2">
            <>
              {Number(quantity) > 0 || !outOfStock ? (
                <span className="text-sm font-medium text-skin-yellow-two">
                  {"Only" + " " + quantity + " " + "Left"}
                </span>
              ) : (
                <div className="text-base text-red-500 whitespace-nowrap">
                  Out of Stock
                </div>
              )}
            </>
          </div>

          <div className="pt-1.5 lg:pt-3 xl:pt-4 space-y-2.5 md:space-y-3.5">
            {/* <Counter
              variant="single"
              value={selectedQuantity}
              onIncrement={() => setSelectedQuantity((prev) => prev + 1)}
              onDecrement={() =>
                setSelectedQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
              }
              disabled={
                isInCart(item.id)
                  ? getItemFromCart(item.id).quantity + selectedQuantity >=
                    Number(item.stock)
                  : selectedQuantity >= Number(item.stock)
              }
            /> */}
            <Button
              onClick={addToCart}
              className="w-full px-1.5"
              loading={addToCartLoader}
            >
              <CartIcon color="#ffffff" className="mr-3" />
              Add to Cart
            </Button>
            <div className="grid grid-cols-2 gap-2.5">
              <Button
                variant="border"
                onClick={addToWishlist}
                loading={addToWishlistLoader}
                className={`group hover:text-skin-primary ${
                  favorite === true && "text-skin-primary"
                }`}
              >
                {favorite === true ? (
                  <IoIosHeart className="text-2xl md:text-[26px] me-2 transition-all" />
                ) : (
                  <IoIosHeartEmpty className="text-2xl md:text-[26px] me-2 transition-all group-hover:text-skin-primary" />
                )}
                Add to Wishlist
              </Button>
              <div className="relative group">
                <Button
                  variant="border"
                  className={`w-full hover:text-skin-primary ${
                    shareButtonStatus === true && "text-skin-primary"
                  }`}
                  onClick={handleChange}
                >
                  <IoArrowRedoOutline className="text-2xl md:text-[26px] me-2 transition-all group-hover:text-skin-primary" />
                  Share
                </Button>
                <SocialShareBox
                  className={`absolute z-10 right-0 w-[300px] md:min-w-[400px] transition-all duration-300 ${
                    shareButtonStatus === true
                      ? "visible opacity-100 top-full"
                      : "opacity-0 invisible top-[130%]"
                  }`}
                  shareUrl={productUrl!!}
                />
              </div>
            </div>
          </div>
          {JSON.parse(product.tags) && (
            <ul className="pt-5 xl:pt-6">
              <li className="text-sm md:text-15px text-skin-base text-opacity-80 inline-flex items-center justify-center mr-2 relative top-1">
                <LabelIcon className="mr-2" /> Tags:
              </li>
              {JSON.parse(product?.tags).map((item: any, idx: any) => (
                <li className="inline-block p-[3px]" key={`tag-${idx}`}>
                  <TagLabel data={item} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <ProductDescriptionTab
        description={product.product_detailed_description}
      />
    </div>
  );
};

export default ProductDetail;
