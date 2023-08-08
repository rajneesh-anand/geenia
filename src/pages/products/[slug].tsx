import Layout from "@components/layout";
import Breadcrumb from "@components/ui/breadcrumb";
import { useRouter } from "next/router";
import { useState } from "react";
import dynamic from "next/dynamic";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useNewProductsQuery } from "@framework/product/get-all-cookies-products";
const ProductList = dynamic(() => import("@components/product/products-list"));

// export default function Products() {
//   return (
//     <>
//       <Seo
//         title="Geenia Organic Beauty Products"
//         description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
//         path="products"
//       />
//       <Divider />
//       <Container className="bg-[#EBE0F0]">
//         <div className="pt-4">
//           <Breadcrumb />
//         </div>

//         <Container>
//           <Element name="grid" className="flex py-6 ">
//             {/* <div className="flex-shrink-0 hidden lg:block w-72  sticky top-16 h-full">
//               <ShopFilters />
//             </div> */}
//             <div className="w-full ">
//               <ProductGrid />
//             </div>
//           </Element>
//         </Container>

//         {/* {data ? (
//           <Element name="grid" className="flex py-6 ">
//             <div className="flex-shrink-0 hidden lg:block w-72  sticky top-16 h-full">
//               <ShopFilters />
//             </div>
//             <div className="w-full ">
//               <ProductGridTwo products={data} />
//             </div>
//           </Element>
//         ) : (
//           <div className="flex flex-col items-center justify-center no-product-found">
//             <Image
//               src="/images/noproduct2.svg"
//               alt="no-product"
//               width={450}
//               height={550}
//             />

//             <p className="pb-16">
//               You can find plenty of other products on our homepage
//             </p>
//           </div>
//         )} */}
//       </Container>
//     </>
//   );
// }

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const { query } = useRouter();

  const {
    data,
    isLoading: loading,
    error,
  } = useNewProductsQuery({
    limit: 12,
    page,
    ...query,
  });

  if (loading) return <Loader text="Loading" />;
  if (error) return <ErrorMessage message={error.message} />;
  function handlePagination(current: any) {
    setPage(current);
  }
  return (
    <>
      <Breadcrumb />
      <ProductList products={data?.products} onPagination={handlePagination} />
    </>
  );
}

ProductsPage.Layout = Layout;

// Products.Layout = Layout;
