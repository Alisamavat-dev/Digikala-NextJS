import Card from "@/ui/card";
import Link from "next/link";

const defaultPlaceholder =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE7Ui111Q0ppxCJctMroRHTZyzWKB28EV8sg&s";

export default async function Brand() {
  let brands = [];
  let error = null;

  try {
    const response = await fetch("http://localhost:4000/api/brand");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    brands = await response.json();
  } catch (err) {
    error = err;
    console.error("Error fetching brands:", error);
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-75">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-700 mb-2">
            خطا در بارگذاری
          </h2>
          <p className="text-red-600 text-sm">
            مشکلی در دریافت اطلاعات برندها پیش آمده است
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  if (!brands || brands.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-75">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            برندی یافت نشد
          </h2>
          <p className="text-gray-500 text-sm">
            در حال حاضر برندی برای نمایش وجود ندارد
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-linaer-to-b from-gray-50 to-white rounded-2xl p-4 md:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-extrabold text-[#E40138] border-r-4 border-[#E40138] pr-3 md:pr-4">
          برندها
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
        {brands.map((brand) => (
          <Link key={brand._id} href={`/brand/${brand._id}`}>
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-100/50 hover:border-red-200 group">
              <Card
                title={brand.name || "برند"}
                image={brand.logo || defaultPlaceholder}
                titleClassName="w-full h-[45px] md:h-[50px] text-[11px] md:text-sm font-semibold text-gray-700 group-hover:text-[#E40138] transition-colors flex justify-center items-center px-2"
                className="flex-col p-0! gap-0! rounded-none! shadow-none!"
                imgClassName="p-0! w-full aspect-square object-contain bg-gradient-to-b from-gray-50 to-white group-hover:bg-red-50 transition-colors flex items-center justify-center p-3"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}