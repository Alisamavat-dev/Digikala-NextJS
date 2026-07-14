import UpdateProducts from "../_component/update_product";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Button from "@/ui/button";

export default async function UpdateProductId({ params }) {
  const { id } = await params;
  let product = null;
  let error = null;

  try {
    const response = await fetch(`http://localhost:4000/api/product/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    product = await response.json();
    console.log(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    error = err.message;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-md p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">
            خطا در بارگذاری محصول
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            مشکلی در دریافت اطلاعات محصول پیش آمده است
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-linear-to-r from-red-500 to-pink-500 text-white rounded-xl hover:shadow-lg hover:shadow-red-500/25 transition-all duration-200 text-sm font-medium"
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  if (!product || !product._id) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-md p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">
            محصول یافت نشد
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            محصول مورد نظر در سیستم وجود ندارد
          </p>
          <Link href="/dashboard/products">
            <Button className="px-6 py-2.5 bg-linear-to-r from-red-500 to-pink-500 text-white rounded-xl hover:shadow-lg hover:shadow-red-500/25 transition-all duration-200 text-sm font-medium">
              بازگشت به لیست محصولات
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const categoryId = product?.category?._id || null;
  const brandId = product?.brand?._id || null;
  const productId = product?._id || id;
  const productName = product?.name || "";
  const productPrice = product?.price || 0;
  const productSale = product?.sale || 0;
  const productMedia = Array.isArray(product?.media) ? product.media : [];

  console.log("Category ID:", categoryId);
  console.log("Brand ID:", brandId);
  console.log("Product Name:", productName);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link href="/dashboard/products">
          <Button
            className="
              fixed top-6 left-6 z-50
              w-10 h-10
              flex items-center justify-center
              rounded-full
              bg-linear-to-r from-red-500 to-pink-500
              text-white
              hover:shadow-lg hover:shadow-red-500/25
              active:scale-95
              transition-all duration-200
              border-0
            "
          >
            <ChevronLeft size={20} />
          </Button>
        </Link>

        <div className="flex justify-center items-center min-h-[calc(100vh-3rem)]">
          <UpdateProducts
            id={productId}
            currentBrand={brandId}
            currentCategory={categoryId}
            currentName={productName}
            currentPrice={productPrice}
            currentSale={productSale}
            currentMedia={productMedia}
          />
        </div>
      </div>
    </div>
  );
}