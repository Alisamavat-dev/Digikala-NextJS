import { Suspense } from "react";
import Footer from "./(marketing)/_components/Footer";
import Header from "./(marketing)/_components/Header";
import NewestProducts from "./(marketing)/_components/NewestProducts";
import ProductsCategory from "./(marketing)/_components/ProductsCategory";
import ShegeftAngiz from "./(marketing)/_components/ShegeftAngiz";
import Baner from "./(marketing)/_components/baner";
import Brands from "./(marketing)/_components/Brand";

function LoadingFallback() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <Suspense fallback={<LoadingFallback />}>
          <Baner />
          <ShegeftAngiz />
          <Brands />
          <NewestProducts />
          <ProductsCategory />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
