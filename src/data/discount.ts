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
    name: "Plum BodyLovin ’Oopsie Daisy’ Body Butter 200g",
    category: "bodycare",
    slug: "plum-bodylovin-oopsie-daisy-body-butter-200g",
    image: "/images/products/noimage.webp",
    price: "525",
    sale_price: "525",
  },
  {
    id: "2",
    category: "bodycare",
    name: "Plum BodyLovin' Hawaiian Rumba Body Mist",
    slug: "plum-bodylovin-hawaiian-rumba-body-mist",
    image: "/images/products/noimage.webp",
    price: "525",
    sale_price: "525",
  },
  {
    id: "3",
    category: "bodycare",
    name: "Plum BodyLovin' Orchid You Not Eau De Parfum - 50 ml",
    slug: "plum-bodylovin-orchid-you-not-eau-de-parfum-50-ml",
    image: "/images/products/noimage.webp",
    price: "950",
    sale_price: "950",
  },
  {
    id: "4",
    category: "bodycare",
    name: "Plum BodyLovin' Vanilla Vibes Eau De Parfum",
    slug: "plum-bodylovin-vanilla-vibes-eau-de-parfum",
    image: "/images/products/noimage.webp",
    price: "950",
    sale_price: "950",
  },
  {
    id: "5",
    category: "bodycare",
    name: "Plum BodyLovin' Feelin' So Rose De-odorizing Pit Cream 50g",
    slug: "plum-bodylovin-feelin-so-rose-de-odorizing-pit-cream-50g",
    image: "/images/products/noimage.webp",

    price: "345",
    sale_price: "345",
  },
];
