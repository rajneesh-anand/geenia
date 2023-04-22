import isEmpty from "lodash/isEmpty";
interface Item {
  id: string | number;
  name: string;
  slug: string;
  image: string;
  price: number | string;
  sale_price?: number | string;
  quantity_in_stock?: number | string;
  [key: string]: unknown;
}

export function generateCartItem(item: Item) {
  const { id, name, slug, image, price, sale_price, quantity_in_stock, unit } =
    item;

  return {
    id,
    name,
    slug,
    unit,
    image: image,
    stock: Number(quantity_in_stock),
    price: Number(sale_price) ? Number(sale_price) : Number(price),
  };
}
