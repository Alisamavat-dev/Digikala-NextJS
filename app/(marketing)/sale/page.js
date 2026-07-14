import Card from "@/ui/card";
import calcSale from "@/utils/calcSale";
import Link from "next/link";

export default async function Sale() {
  const response = await fetch("http://localhost:4000/api/product");
  const products = await response.json();

  const discountProducts = products.filter(
    (product) => Number(product.sale) > 0,
  );

  if (!discountProducts || discountProducts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            محصول تخفیف‌داری وجود ندارد
          </h2>
          <p className="text-gray-500">
            متاسفانه هیچ محصولی با تخفیف برای نمایش یافت نشد
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-linear-to-b from-gray-50 to-white rounded-2xl p-4 md:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-extrabold text-[#E40138] border-r-4 border-[#E40138] pr-3 md:pr-4">
          شگفت انگیز
        </h2>
      </div>

      <div className="flex justify-center w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {discountProducts.map((product, index) => (
            <Link key={product._id || index} href={`/product/${product._id}`}>
              <div className="w-full bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-100/50 hover:border-red-200 group">
                <Card
                  image={product.media[0].url}
                  className="flex-col p-0! gap-0! rounded-none! shadow-none!"
                  imgClassName="p-0! w-full h-48 md:h-56 lg:h-64 object-contain bg-gradient-to-b from-gray-50 to-white flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300"
                >
                  <div className="px-3 pb-4 pt-3 w-full">
                    <div className="text-sm md:text-base font-semibold text-gray-800 line-clamp-2 mb-1 group-hover:text-[#E40138] transition-colors">
                      {product.name}
                    </div>
                    <div className="text-xs md:text-sm text-gray-400 mb-3">
                      {product.brand?.name || "برند"}
                    </div>

                    <div className="flex justify-end items-baseline gap-1 mt-2">
                      <div className="text-base md:text-lg font-bold text-gray-900">
                        {calcSale(product.price, product.sale).toLocaleString()}
                      </div>
                      <div className="text-[11px] md:text-xs text-gray-500">
                        تومان
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 gap-2">
                      <div className="bg-[#E40138] text-white text-[11px] md:text-xs px-2 py-1 rounded-full font-bold">
                        {product.sale}%
                      </div>
                      <div className="text-[11px] md:text-xs text-gray-400 line-through">
                        {product.price.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
