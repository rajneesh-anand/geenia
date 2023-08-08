import React from "react";
import Layout from "@components/layout";
import Container from "@components/ui/container";
import { ProductGridCategoriesWise } from "@components/product/product-grid-category-wise";

export default function SkincareCategoryPage() {
  return (
    <div className="bg-[#EBE0F0] py-8 ">
      <Container>
        <ProductGridCategoriesWise />
      </Container>
    </div>
  );
}

SkincareCategoryPage.Layout = Layout;
