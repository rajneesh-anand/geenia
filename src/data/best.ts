export interface Product {
  id: string;
  name: string;
  slug: string;
  image: string;
  category: string;
  price: string;
  sale_price: string;
}

export const bestSellerProducts: Product[] = [
  {
    id: "1",
    name: "Plum Mandarin & Vitamin C Serum 20ml",
    category: "skincare",
    slug: "Plum Mandarin & Vitamin C Serum 20ml",
    image: "https://www.dropbox.com/s/sxoyo7cdlwuybu5/1.jpg?raw=1",
    price: "550",
    sale_price: "499",
  },
  {
    id: "2",
    category: "skincare",
    name: "Plum 5% Niacinamide Face Serum",
    slug: "Plum 5% Niacinamide Face Serum",
    image: "https://www.dropbox.com/s/himmp42opdz65k4/1.jpg?raw=1",
    price: "599",
    sale_price: "550",
  },
  {
    id: "3",
    category: "skincare",
    name: "Plum Rice Water & 10% Niacinamide Serum 15 ml",
    slug: "Plum Rice Water & 10% Niacinamide Serum 15 ml",
    image: "https://www.dropbox.com/s/txyket9e2mcnnpm/1.jpg?raw=1",
    price: "450",
    sale_price: "399",
  },
  {
    id: "4",
    category: "skincare",
    name: "Plum Green Tea Renewed Clarity Night Gel",
    slug: "Plum Green Tea Renewed Clarity Night Gel",
    image: "https://www.dropbox.com/s/wsllq1gzymmlaph/1.jpg?raw=1",
    price: "575",
    sale_price: "520",
  },
  {
    id: "5",
    category: "bodycare",
    name: "Plum Body lovin Vanilla Vibes Sugar Body Scrub (200 gm)",
    slug: "Plum Body lovin Vanilla Vibes Sugar Body Scrub (200 gm)",
    image: "https://www.dropbox.com/s/bqo5xrrai714mtw/1.jpg?raw=1",
    price: "550",
    sale_price: "499",
  },
];
