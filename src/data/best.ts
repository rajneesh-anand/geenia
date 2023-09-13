export interface Product {
  id: string;
  name: string;
  slug: string;
  image: string;
  category: string;
  price: string;
  sale_price: string;
  new_arrival: string;
}

export const bestSellerProducts: Product[] = [
  {
    id: "1",
    name: "Geenia Charcoal face Gel | For Women and Men 450 gm",
    category: "skincare",
    slug: "geenia-charcoal-face-gel-for-women-and-men-450-gm",
    image:
      "https://www.dropbox.com/s/3wb95m97ix69jdb/Face%20Gel_00001.jpg?raw=1",
    price: "499",
    sale_price: "250",
    new_arrival: "",
  },
  {
    id: "2",
    category: "skincare",
    name: "Geenia Gold Face Gel | For Women and Men 450gm",
    slug: "geenia-gold-face-gel-for-women-and-men-450gm",
    image:
      "https://www.dropbox.com/s/prow2ar08z3ynd7/Face%20Gel_00003.jpg?raw=1",
    price: "499",
    sale_price: "250",
    new_arrival: "",
  },
  {
    id: "3",
    category: "skincare",
    name: "Geenia Fruit n Nuts Face Gel | For Men & Women 450gm",
    slug: "geenia-fruits-n-nuts-face-gel-for-women-and-men-450-gm",
    image:
      "https://www.dropbox.com/s/2157bn0huw9jru8/Face%20Gel_00007.jpg?raw=1",
    price: "499",
    sale_price: "250",
    new_arrival: "",
  },
  {
    id: "4",
    category: "skincare",
    name: "Geenia Herbal Face and Body Scrub | For Women and Men 450gm",
    slug: "geenia-herbal-face-and-body-scrub-for-women-and-men-450gm",
    image:
      "https://www.dropbox.com/s/8wkoxcuqp5xyrx4/Face%20Scrub_00009.jpg?raw=1",
    price: "499",
    sale_price: "250",
    new_arrival: "",
  },
];
