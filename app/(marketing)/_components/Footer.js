"use client";

import {
  ChevronDown,
  ChevronUp,
  Film,
  Play,
  Send,
  User,
  X,
  Phone,
  Download,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [showMore, setShowMore] = useState(false);
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menuName) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="bg-white border-t border-gray-200 py-8 px-4 sm:px-6 md:px-8"
      dir="rtl"
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link href="/" className="hidden lg:block">
            <Image src="/photo/logo.svg" width={185} height={30} alt="logo" />
          </Link>

          <button
            onClick={scrollToTop}
            className="lg:text-gray-500 lg:px-5 lg:py-2.5 rounded-full lg:rounded-xl border border-gray-300 lg:border-gray-200 hover:border-red-400 hover:text-red-500 hover:bg-red-50 transition-all duration-300 flex items-center gap-2 cursor-pointer lg:bg-white bg-gray-100 text-gray-700 p-2.5 lg:p-2.5 text-sm mx-auto lg:mx-0 shadow-sm hover:shadow-md"
          >
            رفتن به بالا
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-wrap justify-between gap-4 mt-8 lg:hidden">
          <div className="flex-1 border border-gray-200 rounded-2xl p-4 cursor-pointer hover:shadow-lg hover:border-red-200 transition-all duration-300 bg-white">
            <div className="flex items-center gap-3 mb-2">
              <Phone className="w-5 h-5 text-red-500" />
              <h4 className="font-bold text-gray-800">تماس</h4>
            </div>
            <p className="text-sm text-gray-700">تماس با پشتیبانی</p>
            <p className="text-xs text-gray-400 mt-1">۷ روز هفته، ۲۴ ساعت</p>
          </div>

          <div className="flex-1 border border-gray-200 rounded-2xl p-4 cursor-pointer hover:shadow-lg hover:border-red-200 transition-all duration-300 bg-white">
            <div className="flex items-center gap-3 mb-2">
              <Download className="w-5 h-5 text-red-500" />
              <h4 className="font-bold text-gray-800">دانلود</h4>
            </div>
            <p className="text-sm text-gray-700">اپلیکیشن دیجی‌کالا</p>
            <p className="text-xs text-gray-400 mt-1">تجربه خرید بهتر</p>
          </div>
        </div>

        <div className="hidden lg:flex flex-wrap items-center gap-x-4 gap-y-2 mt-8 text-sm text-gray-500 bg-gray-50/50 rounded-2xl px-6 py-3">
          <Phone className="w-4 h-4 text-red-500" />
          <p>تلفن پشتیبانی: ۶۱۹۳۰۰۰۰ - ۰۲۱</p>
          <span className="text-gray-300">|</span>
          <p>۰۲۱-۹۱۰۰۰۱۰۰</p>
          <span className="text-gray-300">|</span>
          <p>۷ روز هفته، ۲۴ ساعت پاسخگوی شما هستیم</p>
        </div>

        <div className="hidden lg:flex flex-wrap justify-around items-center gap-x-6 gap-y-4 mt-10">
          <div className="flex flex-col items-center w-32.5 hover:scale-105 transition-all duration-300 cursor-pointer group">
            <Image
              src="https://www.digikala.com/statics/img/svg/footer/express-delivery.svg"
              alt="امکان تحویل اکسپرس"
              width={50}
              height={50}
            />
            <p className="text-xs text-gray-700 mt-2 text-center font-medium group-hover:text-red-500 transition">
              امکان تحویل اکسپرس
            </p>
          </div>

          <div className="flex flex-col items-center w-32.5 hover:scale-105 transition-all duration-300 cursor-pointer group">
            <Image
              src="https://www.digikala.com/statics/img/svg/footer/cash-on-delivery.svg"
              alt="امکان پرداخت در محل"
              width={50}
              height={50}
            />
            <p className="text-xs text-gray-700 mt-2 text-center font-medium group-hover:text-red-500 transition">
              امکان پرداخت در محل
            </p>
          </div>

          <div className="flex flex-col items-center w-32.5 hover:scale-105 transition-all duration-300 cursor-pointer group">
            <Image
              src="https://www.digikala.com/statics/img/svg/footer/support.svg"
              alt="پشتیبانی ۲۴ ساعته"
              width={50}
              height={50}
            />
            <p className="text-xs text-gray-700 mt-2 text-center font-medium group-hover:text-red-500 transition">
              ۷ روز هفته، ۲۴ ساعته
            </p>
          </div>

          <div className="flex flex-col items-center w-32.5 hover:scale-105 transition-all duration-300 cursor-pointer group">
            <Image
              src="https://www.digikala.com/statics/img/svg/footer/days-return.svg"
              alt="هفت روز ضمانت بازگشت کالا"
              width={50}
              height={50}
            />
            <p className="text-xs text-gray-700 mt-2 text-center font-medium group-hover:text-red-500 transition">
              ۷ روز ضمانت بازگشت کالا
            </p>
          </div>

          <div className="flex flex-col items-center w-32.5 hover:scale-105 transition-all duration-300 cursor-pointer group">
            <Image
              src="https://www.digikala.com/statics/img/svg/footer/original-products.svg"
              alt="ضمانت اصل بودن کالا"
              width={50}
              height={50}
            />
            <p className="text-xs text-gray-700 mt-2 text-center font-medium group-hover:text-red-500 transition">
              ضمانت اصل بودن کالا
            </p>
          </div>
        </div>

        <div className="mt-10">
          <div className="lg:hidden">
            <div className="border-b border-gray-200">
              <button
                onClick={() => toggleMenu("digikala")}
                className="flex justify-between items-center w-full py-4 text-right text-sm cursor-pointer hover:bg-red-50 px-3 rounded-lg transition"
              >
                <span className="font-medium text-gray-800">با دیجی‌کالا</span>
                {openMenus.digikala ? (
                  <ChevronUp className="w-5 h-5 text-red-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openMenus.digikala
                    ? "max-h-96 opacity-100 mb-4"
                    : "max-h-0 opacity-0"
                }`}
              >
                <ul className="space-y-3 text-sm text-gray-500 px-3">
                  <li className="hover:text-red-500 transition cursor-pointer">
                    اتاق خبر دیجی‌کالا
                  </li>
                  <li className="hover:text-red-500 transition cursor-pointer">
                    فروش در دیجی‌کالا
                  </li>
                  <li className="hover:text-red-500 transition cursor-pointer">
                    فرصت‌های شغلی
                  </li>
                  <li className="hover:text-red-500 transition cursor-pointer">
                    گزارش تخلف در دیجی‌کالا
                  </li>
                  <li className="hover:text-red-500 transition cursor-pointer">
                    تماس با دیجی‌کالا
                  </li>
                  <li className="hover:text-red-500 transition cursor-pointer">
                    درباره دیجی‌کالا
                  </li>
                  <li className="hover:text-red-500 transition cursor-pointer">
                    خدمات مشتریان
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-b border-gray-200">
              <button
                onClick={() => toggleMenu("customers")}
                className="flex justify-between items-center w-full py-4 text-right text-sm cursor-pointer hover:bg-red-50 px-3 rounded-lg transition"
              >
                <span className="font-medium text-gray-800">خدمات مشتریان</span>
                {openMenus.customers ? (
                  <ChevronUp className="w-5 h-5 text-red-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openMenus.customers
                    ? "max-h-96 opacity-100 mb-4"
                    : "max-h-0 opacity-0"
                }`}
              >
                <ul className="space-y-3 text-sm text-gray-500 px-3">
                  <li className="hover:text-red-500 transition cursor-pointer">
                    پاسخ به پرسش‌های متداول
                  </li>
                  <li className="hover:text-red-500 transition cursor-pointer">
                    رویه‌های بازگرداندن کالا
                  </li>
                  <li className="hover:text-red-500 transition cursor-pointer">
                    شرایط استفاده
                  </li>
                  <li className="hover:text-red-500 transition cursor-pointer">
                    حریم خصوصی
                  </li>
                  <li className="hover:text-red-500 transition cursor-pointer">
                    گزارش باگ
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-b border-gray-200">
              <button
                onClick={() => toggleMenu("guide")}
                className="flex justify-between items-center w-full py-4 text-right text-sm cursor-pointer hover:bg-red-50 px-3 rounded-lg transition"
              >
                <span className="font-medium text-gray-800">
                  راهنمای خرید از دیجی‌کالا
                </span>
                {openMenus.guide ? (
                  <ChevronUp className="w-5 h-5 text-red-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openMenus.guide
                    ? "max-h-96 opacity-100 mb-4"
                    : "max-h-0 opacity-0"
                }`}
              >
                <ul className="space-y-3 text-sm text-gray-500 px-3">
                  <li className="hover:text-red-500 transition cursor-pointer">
                    نحوه ثبت سفارش
                  </li>
                  <li className="hover:text-red-500 transition cursor-pointer">
                    رویه ارسال سفارش
                  </li>
                  <li className="hover:text-red-500 transition cursor-pointer">
                    شیوه‌های پرداخت
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex lg:flex-nowrap justify-between items-start gap-12">
            <div>
              <h3 className="text-xl mb-5 font-bold text-gray-800">
                با دیجی‌کالا
              </h3>
              <ul className="space-y-4 text-md text-gray-500">
                <li className="cursor-pointer hover:text-red-500 transition">
                  اتاق خبر دیجی‌کالا
                </li>
                <li className="cursor-pointer hover:text-red-500 transition">
                  فروش در دیجی‌کالا
                </li>
                <li className="cursor-pointer hover:text-red-500 transition">
                  فرصت‌های شغلی
                </li>
                <li className="cursor-pointer hover:text-red-500 transition">
                  گزارش تخلف در دیجی‌کالا
                </li>
                <li className="cursor-pointer hover:text-red-500 transition">
                  تماس با دیجی‌کالا
                </li>
                <li className="cursor-pointer hover:text-red-500 transition">
                  درباره دیجی‌کالا
                </li>
                <li className="cursor-pointer hover:text-red-500 transition">
                  خدمات مشتریان
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl mb-5 font-bold text-gray-800">
                خدمات مشتریان
              </h3>
              <ul className="space-y-4 text-md text-gray-500">
                <li className="cursor-pointer hover:text-red-500 transition">
                  پاسخ به پرسش‌های متداول
                </li>
                <li className="cursor-pointer hover:text-red-500 transition">
                  رویه‌های بازگرداندن کالا
                </li>
                <li className="cursor-pointer hover:text-red-500 transition">
                  شرایط استفاده
                </li>
                <li className="cursor-pointer hover:text-red-500 transition">
                  حریم خصوصی
                </li>
                <li className="cursor-pointer hover:text-red-500 transition">
                  گزارش باگ
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl mb-5 font-bold text-gray-800">
                راهنمای خرید از دیجی‌کالا
              </h3>
              <ul className="space-y-4 text-md text-gray-500">
                <li className="cursor-pointer hover:text-red-500 transition">
                  نحوه ثبت سفارش
                </li>
                <li className="cursor-pointer hover:text-red-500 transition">
                  رویه ارسال سفارش
                </li>
                <li className="cursor-pointer hover:text-red-500 transition">
                  شیوه‌های پرداخت
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg mb-5 font-bold text-gray-800">
                همراه ما باشید!
              </h3>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-100 hover:scale-110 transition-all duration-300 cursor-pointer group">
                  <Film className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition" />
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-100 hover:scale-110 transition-all duration-300 cursor-pointer group">
                  <Send className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition" />
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-100 hover:scale-110 transition-all duration-300 cursor-pointer group">
                  <User className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition" />
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-100 hover:scale-110 transition-all duration-300 cursor-pointer group">
                  <X className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition" />
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-100 hover:scale-110 transition-all duration-300 cursor-pointer group">
                  <Play className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mt-8 px-2 sm:px-4 mb-13">
          <h5 className="text-gray-800 text-lg sm:text-xl py-2 font-bold">
            دیجی کالا؛ بزرگترین فروشگاه اینترنتی ایران
          </h5>

          <div className="relative">
            <p className="text-xs sm:text-sm text-gray-500 leading-7">
              دیجی کالا سال‌ها است که به انتخاب اول بسیاری از خریداران اینترنتی
              تبدیل شده است. دیجی کالا به عنوان بزرگ‌ترین و معتبرترین فروشگاه
              آنلاین ایران، شناخته‌شده‌ترین فروشگاه نیز محسوب می‌شود. این
              فروشگاه آنلاین نه‌تنها گسترده‌ترین تنوع کالا را در دسته‌بندی‌های
              مختلف ارائه می‌دهد، بلکه با خدمات بی‌نظیر، ارسال سریع، ضمانت اصل
              بودن کالا و پشتیبانی حرفه‌ای، استاندارد جدیدی در خرید اینترنتی
              ایران تعریف کرده است.
            </p>

            {!showMore && (
              <>
                <div className="absolute bottom-0 left-0 right-0 h-25 bg-linear-to-t from-white to-transparent pointer-events-none"></div>
                <button
                  onClick={() => setShowMore(true)}
                  className="absolute -bottom-8 right-0 text-red-500 text-sm hover:text-red-600 transition-all duration-300 font-medium flex gap-2 cursor-pointer hover:gap-3"
                >
                  مشاهده بیشتر
                  <ChevronDown className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          <div
            className={`overflow-hidden transition-all duration-700 ease-in-out ${
              showMore ? "max-h-500 opacity-100 mt-4" : "max-h-0 opacity-0"
            }`}
          >
            <div className="w-full text-sm text-gray-600">
              <h5 className="text-gray-800 text-lg sm:text-xl my-3 font-bold">
                ارسال سریع و مطمئن کالا
              </h5>
              <p className="text-gray-500 text-xs sm:text-sm leading-7">
                یکی از مهم‌ترین دغدغه‌های کاربران خرید آنلاین، زمان تحویل کالا
                است. دیجی کالا برای حل این مشکل، گزینه‌های مختلف ارسال را در نظر
                گرفته است تا کاربران بر اساس نیاز خود، روش ارسال مناسب را انتخاب
                کنند. به عنوان مثال، ارسال کالا به صورت تحویل امروز با ارسال
                سریع دیجی‌کالا، از جمله روش‌های خرید سریع از این فروشگاه
                اینترنتی است. این امکانات باعث می‌شود که خریداران بتوانند سفارش
                خود را در کوتاه‌ترین زمان ممکن دریافت کنند. علاوه بر این، در
                صورتی که کالای خریداری شده از لحاظ کیفیت یا هر دلیل دیگری رضایت
                مشتری را جلب نکرده باشد، دیجی کالا ضمانت بازگشت کالا را ارائه
                می‌دهد. این ویژگی موجب اعتماد بیشتر مشتریان به خرید آنلاین از
                فروشگاه اینترنتی دیجی کالا شده است.
              </p>
              <h5 className="text-gray-800 text-lg sm:text-xl my-3 font-bold">
                تخفیف های ویژه و جشنواره ها
              </h5>
              <p className="text-gray-500 text-xs sm:text-sm leading-7">
                دیجی کالا به طور منظم جشنواره‌ها و تخفیف‌های ویژه‌ای را برگزار
                می‌کند که برای مشتریان فرصت خرید کالاهای باکیفیت با قیمت‌های
                مناسب به همراه خواهد داشت. این تخفیف‌ها در ایام خاص مانند بلک
                فرایدی یا همان حراج جمعه سیاه، خرید هدیه روز مادر و کادو روز
                پدر، شب یلدا و جشنواره‌های فصلی تابستان و زمستان توجه بسیاری از
                خریداران را جلب می‌کند. در این جشنواره‌ها، دیجی کالا تخفیف‌های
                عالی روی محصولات مختلف از جمله گوشی‌های موبایل، لپ تاپ‌ها،
                تلویزیون‌ها، و حتی محصولات مناسب سازمانی مثل پک هدیه یلدا ارائه
                می‌دهد. می‌توانید گوشی ایفون ۱۶ یا گوشی S25 را با تخفیف‌های ویژه
                خریداری کنید و از قیمت مناسب بهره‌مند شوید. دیجی کالا فراتر از
                یک فروشگاه اینترنتی، یک تجربه خرید مطمئن در بین کاربران مختلف
                بوده است که با ارائه بزرگ‌ترین تنوع کالا، قیمت‌های مختلف و
                خدماتی بی‌نقص، به مقصد اول خریداران آنلاین در ایران تبدیل شده
                است.
              </p>
              <h5 className="text-gray-800 text-lg sm:text-xl my-3 font-bold">
                انواع محصولات فروشگاه دیجی کالا
              </h5>
              <p className="text-gray-500 text-xs sm:text-sm leading-7">
                دیجی کالا دارای محصولات متنوعی در گروه‌های مختلف است که خرید
                آنها بسیار راحت و سریع است. به عنوان مثال، اگر به دنبال قاب گوشی
                یا هندزفری بلوتوثی باشید، می‌توانید مدل‌های مختلف و برندهای
                گوناگونی را در این فروشگاه پیدا کنید.
              </p>
            </div>
            <button
              onClick={() => setShowMore(false)}
              className="text-red-500 text-sm hover:text-red-600 transition font-medium mt-2 flex gap-2 cursor-pointer hover:gap-3"
            >
              مشاهده کمتر
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="hidden lg:block w-full border-t border-gray-200 mt-8"></div>

        <p className="hidden lg:flex text-xs text-gray-400 leading-6 justify-center mt-6 text-center">
          برای استفاده از مطالب دیجی‌کالا، داشتن «هدف غیرتجاری» و ذکر «منبع»
          کافیست. تمام حقوق این وب‌سایت نیز برای شرکت نوآوران فن آوازه (فروشگاه
          آنلاین دیجی‌کالا) است.
        </p>
      </div>
    </footer>
  );
}