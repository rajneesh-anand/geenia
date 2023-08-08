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
    name: "Plum Mandarin & Vitamin C Serum 20ml",
    category: "skincare",
    slug: "plum-mandarin-vitamin-c-serum-20ml",
    image: "https://www.dropbox.com/s/sxoyo7cdlwuybu5/1.jpg?raw=1",
    price: "550",
    sale_price: "499",
    new_arrival: "",
  },
  {
    id: "2",
    category: "skincare",
    name: "Plum 5% Niacinamide Face Serum",
    slug: "plum-5-niacinamide-face-serum",
    image: "https://www.dropbox.com/s/himmp42opdz65k4/1.jpg?raw=1",
    price: "599",
    sale_price: "550",
    new_arrival: "",
  },
  {
    id: "3",
    category: "skincare",
    name: "Plum Rice Water & 10% Niacinamide Serum 15 ml",
    slug: "plum-rice-water-10-niacinamide-serum-15-ml",
    image: "https://www.dropbox.com/s/txyket9e2mcnnpm/1.jpg?raw=1",
    price: "450",
    sale_price: "399",
    new_arrival: "",
  },
  {
    id: "4",
    category: "skincare",
    name: "Plum Green Tea Renewed Clarity Night Gel",
    slug: "plum-green-tea-renewed-clarity-night-gel",
    image: "https://www.dropbox.com/s/wsllq1gzymmlaph/1.jpg?raw=1",
    price: "575",
    sale_price: "520",
    new_arrival: "",
  },
  {
    id: "5",
    category: "bodycare",
    name: "Plum Body lovin Vanilla Vibes Sugar Body Scrub (200 gm)",
    slug: "plum-body-lovin-vanilla-vibes-sugar-body-scrub-200-gm",
    image: "https://www.dropbox.com/s/bqo5xrrai714mtw/1.jpg?raw=1",
    price: "550",
    sale_price: "499",
    new_arrival: "",
  },
];
