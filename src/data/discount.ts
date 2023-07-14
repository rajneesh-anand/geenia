export interface Product {
  id: string;
  name: string;
  slug: string;
  price: string;
  image: string;
  sale_price: string;
  category: string;
}

export const discountProducts: Product[] = [
  {
    id: "1",
    name: "Geenia De-Tan Face Pack | Clay mask for Acne and Clogged Pores, With De-Tan Extracts | Oily Skin | Brighter, Glowing Skin | Natural face pack | Cruelty Free | Paraben Free | 450g",
    category: "skincare",
    slug: "geenia-de-tan-face-pack-clay-mask-for-acne-and-clogged-pores-with-de-tan-extracts-oily-skin-brighter-glowing-skin-natural-face-pack-cruelty-free-paraben-free-450g",
    image:
      "https://www.dropbox.com/s/ae9x4hd6b22retb/Face%20Pack_00011.jpg?raw=1",
    price: "499",
    sale_price: "250",
  },

  {
    id: "2",
    name: "Geenia Strawberry Face Pack | Clay mask for Acne and Clogged Pores | Oily Skin | Brighter, Glowing Skin | Natural face pack With Strawberry Extract | Cruelty Free | Paraben Free | 450g",
    category: "skincare",
    slug: "geenia-strawberry-face-pack-clay-mask-for-acne-and-clogged-pores-oily-skin-brighter-glowing-skin-natural-face-pack-with-strawberry-extract-cruelty-free-paraben-free-450g",
    image:
      "https://www.dropbox.com/s/ae9x4hd6b22retb/Face%20Pack_00011.jpg?raw=1",
    price: "499",
    sale_price: "250",
  },
  {
    id: "3",
    name: "Geenia Orange Face Pack | Clay mask for Acne and Clogged Pores | Oily Skin | Brighter, Glowing Skin |Anti-aging | Cruelty Free | With Orange Extracts, Paraben Free | 450g",
    category: "skincare",
    slug: "geenia-orange-face-pack-clay-mask-for-acne-and-clogged-pores-oily-skin-brighter-glowing-skin-anti-aging-cruelty-free-with-orange-extracts-paraben-free-450g",
    image:
      "https://www.dropbox.com/s/ek1pjl8xz7uhwmk/Face%20Pack_00015.jpg?raw=1",
    price: "499",
    sale_price: "250",
  },
  {
    id: "4",
    name: "Geenia Mango Face Pack | Clay mask for Acne and Clogged Pores | Oily Skin | Brighter, Glowing Skin With Mango Extracts |Anti-aging | Cruelty Free | Paraben Free | 450g",
    category: "skincare",
    slug: "geenia-mango-face-pack-clay-mask-for-acne-and-clogged-pores-oily-skin-brighter-glowing-skin-with-mango-extracts-anti-aging-cruelty-free-paraben-free-450g",
    image:
      "https://www.dropbox.com/s/xup8estuhp3a3m2/Face%20Pack_00017.jpg?raw=1",
    price: "499",
    sale_price: "250",
  },
];
