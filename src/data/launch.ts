export interface Product {
  id: string;
  name: string;
  slug: string;
  price: string;
  image: string;
  sale_price: string;
  category: string;
}

export const launchProducts: Product[] = [
  {
    id: "1",
    name: "Geenia Charcoal Deep tissue | Natural Massage Cream with Charcoal Extract| Paraben Free, Cruelty Free | Nourishing & Refreshing | Moisturizing Massage cream| Face Massage cream | for Men & Women 450gm",
    category: "skincare",
    slug: "geenia-charcoal-deep-tissue-natural-massage-cream-with-charcoal-extract-paraben-free-cruelty-free-nourishing-refreshing-moisturizing-massage-cream-face-massage-cream-for-men-women-450gm",
    image: "https://www.dropbox.com/s/oj5tmishaac94ne/0001.jpg?raw=1",
    price: "499",
    sale_price: "250",
  },

  {
    id: "2",
    name: "Geenia Gold Face Massage Cream| Natural Massage Cream with Gold Extract | Paraben Free, Cruelty Free | Nourishing & Refreshing | Moisturizing Massage cream| Face Massage cream | for Men & Women 450gm",
    category: "skincare",
    slug: "geenia-gold-face-massage-cream-natural-massage-cream-with-gold-extract-paraben-free-cruelty-free-nourishing-refreshing-moisturizing-massage-cream-face-massage-cream-for-men-women-450gm",
    image: "https://www.dropbox.com/s/eh7gbzw13ke4qy0/0003.jpg?raw=1",
    price: "499",
    sale_price: "250",
  },
  {
    id: "3",
    name: "Geenia Fruit n Nuts Deep Natural Massage Cream with Fruit n Nuts Extract| Paraben Free, Cruelty Free | Nourishing & Refreshing | Moisturizing Massage cream| Face Massage cream | for Men & Women 450gm",
    category: "skincare",
    slug: "geenia-fruit-n-nuts-deep-natural-massage-cream-with-fruit-n-nuts-extract-paraben-free-cruelty-free-nourishing-refreshing-moisturizing-massage-cream-face-massage-cream-for-men-women-450gm",
    image: "https://www.dropbox.com/s/of6m1lkgm6da7rn/0005.jpg?raw=1",
    price: "499",
    sale_price: "250",
  },
  {
    id: "4",
    name: "Geenia Diamond Deep tissue | Natural Massage Cream with Diamond Extract| Paraben Free | Nourishing & Refreshing | Moisturizing Massage cream| Relaxation | Face Massage cream | for Men & Women 450gm",
    category: "skincare",
    slug: "geenia-diamond-deep-tissue-natural-massage-cream-with-diamond-extract-paraben-free-nourishing-refreshing-moisturizing-massage-cream-relaxation-face-massage-cream-for-men-women-450gm",
    image: "https://www.dropbox.com/s/363xigqpevlnv32/0007.jpg?raw=1",
    price: "499",
    sale_price: "250",
  },
];
