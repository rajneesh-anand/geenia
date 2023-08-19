import { useState } from "react";
import Button from "@components/ui/button";
import { useRouter } from "next/router";
import useWindowSize from "@utils/use-window-size";
import usePrice from "@framework/use-price";
import { useCart } from "@contexts/cart/cart.context";
import { generateCartItem } from "@utils/generate-cart-item";
import { toast } from "react-toastify";
import { scroller, Element } from "react-scroll";
import ThumbnailCarousel from "@components/ui/carousel/thumbnail-carousel";
import { ThumbsCarousel } from "@components/ui/carousel/thumb-carousel";
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
                src={product?.gallery[0] ?? "/images/placeholder/product.svg"}
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

    // <article className="rounded-lg bg-light">
    //   <div className="flex flex-col border-b border-border-200 border-opacity-70 md:flex-row">
    //     <div className="p-6 md:w-1/2 lg:px-14 lg:py-4 ">
    //       <div className="h-full product-gallery">
    //         <ThumbsCarousel
    //           gallery={product?.gallery}
    //           hideThumbs={JSON.parse(product?.gallery).length <= 1}
    //         />
    //       </div>
    //     </div>

    //     {/* <div className="flex flex-col items-start p-5 pt-10 md:w-1/2 lg:p-14 xl:p-16">
    //       <div className="w-full" ref={intersectionRef}>
    //         <div className="flex items-start justify-between w-full space-x-8 rtl:space-x-reverse">
    //           <h1
    //             className={classNames(
    //               `text-lg font-semibold tracking-tight text-heading md:text-xl xl:text-2xl`,
    //               {
    //                 "cursor-pointer transition-colors hover:text-accent":
    //                   isModal,
    //               }
    //             )}
    //             {...(isModal && {
    //               onClick: () => navigate(Routes.product(slug)),
    //             })}
    //           >
    //             {name}
    //           </h1>

    //           <div>
    //             <FavoriteButton
    //               productId={id}
    //               className={classNames({ "mr-1": isModal })}
    //             />
    //           </div>
    //         </div>
    //         <div className="flex items-center justify-between mt-2">
    //           {unit && !hasVariations && (
    //             <span className="block text-sm font-normal text-body">
    //               {unit}
    //             </span>
    //           )}

    //           {isModal && (
    //             <div className="inline-flex items-center px-3 py-1 text-sm text-white border rounded shrink-0 border-accent bg-accent">
    //               {ratings}
    //               <StarIcon className="h-2.5 w-2.5 ltr:ml-1 rtl:mr-1" />
    //             </div>
    //           )}
    //         </div>

    //         {description && (
    //           <div className="mt-3 text-sm leading-7 text-body md:mt-4">
    //             <Truncate
    //               character={150}
    //               {...(!isModal && {
    //                 onClick: () => scrollDetails(),
    //                 compressText: "common:text-see-more",
    //               })}
    //             >
    //               {description}
    //             </Truncate>
    //           </div>
    //         )}

    //         {hasVariations ? (
    //           <>
    //             <div className="flex items-center my-5 md:my-10">
    //               <VariationPrice
    //                 selectedVariation={selectedVariation}
    //                 minPrice={product.min_price}
    //                 maxPrice={product.max_price}
    //               />
    //             </div>
    //             <div>
    //               <VariationGroups variations={variations} />
    //             </div>
    //           </>
    //         ) : (
    //           <span className="flex items-center my-5 md:my-10">
    //             <ins className="text-2xl font-semibold no-underline text-accent md:text-3xl">
    //               {price}
    //             </ins>
    //             {basePrice && (
    //               <del className="text-sm font-normal text-muted ltr:ml-2 rtl:mr-2 md:text-base">
    //                 {basePrice}
    //               </del>
    //             )}
    //           </span>
    //         )}

    //         <div className="flex flex-col items-center mt-6 md:mt-6 lg:flex-row">
    //           <div className="mb-3 w-full lg:mb-0 lg:max-w-[400px]">
    //             <AddToCart
    //               data={product}
    //               variant="big"
    //               variation={selectedVariation}
    //               disabled={selectedVariation?.is_disable || !isSelected}
    //             />
    //           </div>

    //           {!hasVariations && (
    //             <>
    //               {Number(quantity) > 0 ? (
    //                 <span className="text-base whitespace-nowrap text-body ltr:lg:ml-7 rtl:lg:mr-7">
    //                   {quantity} {t("text-pieces-available")}
    //                 </span>
    //               ) : (
    //                 <div className="text-base text-red-500 whitespace-nowrap ltr:lg:ml-7 rtl:lg:mr-7">
    //                   {t("text-out-stock")}
    //                 </div>
    //               )}
    //             </>
    //           )}
    //           {!isEmpty(selectedVariation) && (
    //             <span className="text-base whitespace-nowrap text-body ltr:lg:ml-7 rtl:lg:mr-7">
    //               {selectedVariation?.is_disable ||
    //               selectedVariation.quantity === 0
    //                 ? t("text-out-stock")
    //                 : `${selectedVariation.quantity} ${t(
    //                     "text-pieces-available"
    //                   )}`}
    //             </span>
    //           )}
    //         </div>
    //       </div>

    //       {!!categories?.length && (
    //         <CategoryBadges
    //           categories={categories}
    //           basePath={`/${type?.slug}`}
    //           onClose={closeModal}
    //         />
    //       )}

    //       {shop?.name && (
    //         <div className="flex items-center mt-2">
    //           <span className="py-1 text-sm font-semibold capitalize text-heading ltr:mr-6 rtl:ml-6">
    //             {t("common:text-sellers")}
    //           </span>

    //           <button
    //             onClick={() => navigate(Routes.shop(shop?.slug))}
    //             className="text-sm tracking-wider underline transition text-accent hover:text-accent-hover hover:no-underline"
    //           >
    //             {shop?.name}
    //           </button>
    //         </div>
    //       )}
    //     </div> */}
    //   </div>

    //   <Element
    //     name="details"
    //     className="px-5 py-4 border-b border-border-200 border-opacity-70 lg:px-16 lg:py-14"
    //   >
    //     <h2 className="mb-4 text-lg font-semibold tracking-tight text-heading md:mb-6">
    //       Product Details
    //     </h2>
    //     <p className="text-sm text-body">
    //       {product.product_detailed_description}
    //     </p>
    //   </Element>
    // </article>
  );
};

export default ProductDetail;
