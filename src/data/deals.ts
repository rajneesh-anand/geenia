export interface Product {
  id: string;
  name: string;
  slug: string;
  price: string;
  image: string;
  sale_price: string;
  category: string;
  new_arrival: string;
}

export const dealsProducts: Product[] = [
  {
    id: "1",
    name: "Geenia CharcoaL Deep Detoxifying + Sebum Control Purifying Scrub 450G",
    category: "skincare",
    slug: "geenia-charcoal-deep-detoxifying-sebum-control-purifying-scrub-450g",
    image:
      "https://www.dropbox.com/s/2ipdy5t4rp95hhr/Face%20Scrub_00001.jpg?raw=1",
    price: "499",
    sale_price: "250",
    new_arrival: "",
  },

  {
    id: "2",
    name: "Geenia Professional Gold Scrub For Glow & Radiance Skin 450gm",
    category: "skincare",
    slug: "geenia-professional-gold-scrub-for-glow-radiance-skin-450gm",
    image:
      "https://www.dropbox.com/s/cmd9towzwfaeizx/Face%20Scrub_00003.jpg?raw=1",
    price: "499",
    sale_price: "250",
    new_arrival: "",
  },
  {
    id: "3",
    name: "Geenia Fruit n Nuts Tan Removal Brightening & Reviatalizing Face Scrub For All Skin Types, 450g",
    category: "skincare",
    slug: "geenia-fruit-n-nuts-tan-removal-brightening-reviatalizing-face-scrub-for-all-skin-types-450g",
    image:
      "https://www.dropbox.com/s/1229p3ps68s7ct7/Face%20Scrub_00005.jpg?raw=1",
    price: "499",
    sale_price: "250",
    new_arrival: "",
  },
  {
    id: "4",
    name: "Geenia Naturals Revival Diamond Face Scrub, For Deep Pore Cleansing & Skin Lightening, Suitable For All Skin Types, 450g (pack of 1)",
    category: "skincare",
    slug: "geenia-naturals-revival-diamond-face-scrub-for-deep-pore-cleansing-skin-lightening-suitable-for-all-skin-types-450g-pack-of-1",
    image:
      "https://www.dropbox.com/s/9sgt5gmua51pejy/Face%20Scrub_00007.jpg?raw=1",
    price: "499",
    sale_price: "250",
    new_arrival: "",
  },
];
