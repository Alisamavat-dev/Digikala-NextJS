"use client";

import {
  ChevronDown,
  ChevronUp,
  Film,
  Play,
  Send,
  User,
  X,
  Menu,
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
    <footer className="bg-white border-t border-gray-200 py-8 px-6" dir="rtl">

      <div className="flex justify-center lg:justify-between items-center">
        <Link href="/" className="hidden lg:flex">
          <Image src="/photo/logo.svg" width={185} height={30} alt="logo" />
        </Link>

        <button
          onClick={scrollToTop}
          className="lg:text-[#A1A3A8] lg:px-4 lg:py-2 rounded-4xl lg:rounded-lg  border lg:border-[#A1A3A8] hover:bg-gray-50 transition-all flex items-center gap-2 cursor-pointer lg:bg-white  bg-[#F2F2F2] text-black p-1.5 text-sm "
        >
          رفتن به بالا
          <ChevronUp className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-wrap justify-between gap-4 mt-8 lg:hidden">
        <div className="flex-1 border rounded-lg p-4 cursor-pointer">
          <div className="flex items-center gap-3 mb-2">
            <Phone className="w-5 h-5 text-blue-600" />
            <h4 className="font-bold">تماس</h4>
          </div>
          <p className="text-sm text-gray-700">تماس با پشتیبانی</p>
          <p className="text-xs text-gray-500 mt-1">۷ روز هفته، ۲۴ ساعت</p>
        </div>

        <div className="flex-1 border rounded-lg p-4 cursor-pointer">
          <div className="flex items-center gap-3 mb-2 ">
            <Download className="w-5 h-5 text-green-600" />
            <h4 className="font-bold">دانلود</h4>
          </div>
          <p className="text-sm text-gray-700">اپلیکیشن دیجی‌کالا</p>
          <p className="text-xs text-gray-500 mt-1">تجربه خرید بهتر </p>
        </div>
      </div>

      <div className="hidden lg:flex flex-wrap items-center gap-x-4 gap-y-2 mt-8 text-sm text-gray-600">
        <p>تلفن پشتیبانی:۶۱۹۳۰۰۰۰ - ۰۲۱</p>
        <p>|</p>
        <p>۰۲۱-۹۱۰۰۰۱۰۰</p>
        <p>|</p>
        <p>۷ روز هفته، ۲۴ ساعت پاسخگوی شما هستیم</p>
      </div>

      <div className="hidden lg:flex flex-wrap justify-around items-center gap-x-6 gap-y-4 mt-10 cursor-pointer">
        <div className="flex flex-col items-center w-32.5">
          <Image
            src="https://www.digikala.com/statics/img/svg/footer/express-delivery.svg"
            alt="امکان تحویل اکسپرس"
            width={60}
            height={60}
          />
          <p className="text-xs text-gray-700 mt-2 text-center">
            امکان تحویل اکسپرس
          </p>
        </div>

        <div className="flex flex-col items-center w-32.5">
          <Image
            src="https://www.digikala.com/statics/img/svg/footer/cash-on-delivery.svg"
            alt="امکان پرداخت در محل"
            width={60}
            height={60}
          />
          <p className="text-xs text-gray-700 mt-2 text-center">
            امکان پرداخت در محل
          </p>
        </div>

        <div className="flex flex-col items-center w-32.5">
          <Image
            src="https://www.digikala.com/statics/img/svg/footer/support.svg"
            alt="پشتیبانی ۲۴ ساعته"
            width={60}
            height={60}
          />
          <p className="text-xs text-gray-700 mt-2 text-center">
            ۷ روز هفته، ۲۴ ساعته
          </p>
        </div>

        <div className="flex flex-col items-center w-32.5">
          <Image
            src="https://www.digikala.com/statics/img/svg/footer/days-return.svg"
            alt="هفت روز ضمانت بازگشت کالا"
            width={60}
            height={60}
          />
          <p className="text-xs text-gray-700 mt-2 text-center">
            ۷ روز ضمانت بازگشت کالا
          </p>
        </div>

        <div className="flex flex-col items-center w-32.5">
          <Image
            src="https://www.digikala.com/statics/img/svg/footer/original-products.svg"
            alt="ضمانت اصل بودن کالا"
            width={60}
            height={60}
          />
          <p className="text-xs text-gray-700 mt-2 text-center">
            ضمانت اصل بودن کالا
          </p>
        </div>
      </div>

      <div className="mt-10">
        <div className="lg:hidden">
          <div className="border-b border-gray-200">
            <button
              onClick={() => toggleMenu("digikala")}
              className="flex justify-between items-center w-full py-4 text-right  text-sm cursor-pointer"
            >
              با دیجی‌کالا
              {openMenus.digikala ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openMenus.digikala
                  ? "max-h-96 opacity-100 mb-4"
                  : "max-h-0 opacity-0"
              }`}
            >
              <ul className="space-y-3 text-sm text-gray-500 cursor-pointer ">
                <li>اتاق خبر دیجی‌کالا</li>
                <li>فروش در دیجی‌کالا</li>
                <li>فرصت‌های شغلی</li>
                <li>گزارش تخلف در دیجی‌کالا</li>
                <li>تماس با دیجی‌کالا</li>
                <li>درباره دیجی‌کالا</li>
                <li>خدمات مشتریان</li>
              </ul>
            </div>
          </div>

          <div className="border-b border-gray-200">
            <button
              onClick={() => toggleMenu("customers")}
              className="flex justify-between items-center w-full py-4 text-right  text-sm cursor-pointer"
            >
              خدمات مشتریان
              {openMenus.customers ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openMenus.customers
                  ? "max-h-96 opacity-100 mb-4"
                  : "max-h-0 opacity-0"
              }`}
            >
              <ul className="space-y-3 text-sm text-gray-500 cursor-pointer ">
                <li>پاسخ به پرسش‌های متداول</li>
                <li>رویه‌های بازگرداندن کالا</li>
                <li>شرایط استفاده</li>
                <li>حریم خصوصی</li>
                <li>گزارش باگ</li>
              </ul>
            </div>
          </div>

          <div className="border-b border-gray-200">
            <button
              onClick={() => toggleMenu("guide")}
              className="flex justify-between items-center w-full py-4 text-right  text-sm cursor-pointer"
            >
              راهنمای خرید از دیجی‌کالا
              {openMenus.guide ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openMenus.guide
                  ? "max-h-96 opacity-100 mb-4"
                  : "max-h-0 opacity-0"
              }`}
            >
              <ul className="space-y-3 text-sm text-gray-500 cursor-pointer ">
                <li>نحوه ثبت سفارش</li>
                <li>رویه ارسال سفارش</li>
                <li>شیوه‌های پرداخت</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex lg:flex-nowrap justify-between items-start gap-12">
          <div>
            <h3 className="text-xl mb-5">با دیجی‌کالا</h3>
            <ul className="space-y-4 text-md text-gray-500 cursor-pointer">
              <li>اتاق خبر دیجی‌کالا</li>
              <li>فروش در دیجی‌کالا</li>
              <li>فرصت‌های شغلی</li>
              <li>گزارش تخلف در دیجی‌کالا</li>
              <li>تماس با دیجی‌کالا</li>
              <li>درباره دیجی‌کالا</li>
              <li>خدمات مشتریان</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl mb-5">خدمات مشتریان</h3>
            <ul className="space-y-4 text-md text-gray-500 cursor-pointer">
              <li>پاسخ به پرسش‌های متداول</li>
              <li>رویه‌های بازگرداندن کالا</li>
              <li>شرایط استفاده</li>
              <li>حریم خصوصی</li>
              <li>گزارش باگ</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl mb-5">راهنمای خرید از دیجی‌کالا</h3>
            <ul className="space-y-4 text-md text-gray-500 cursor-pointer">
              <li>نحوه ثبت سفارش</li>
              <li>رویه ارسال سفارش</li>
              <li>شیوه‌های پرداخت</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg mb-5">همراه ما باشید!</h3>
            <div className="flex gap-5">
              <Film className="w-9 h-9 text-gray-500 cursor-pointer hover:text-orange-600 transition" />
              <Send className="w-9 h-9 text-gray-500 cursor-pointer hover:text-blue-600 transition" />
              <User className="w-9 h-9 text-gray-500 cursor-pointer hover:text-pink-600 transition" />
              <X className="w-9 h-9 text-gray-500 cursor-pointer hover:text-gray-700 transition" />
              <Play className="w-9 h-9 text-gray-500 cursor-pointer hover:text-red-600 transition" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-full lg:max-w-[60%] mt-8 px-4 mb-13">
        <h5 className="text-[#62666D] text-xl py-2">
          دیجی کالا؛ بزرگترین فروشگاه اینترنتی ایران
        </h5>

        <div className="relative">
          <p className="text-sm text-[#979A9F] leading-7">
            دیجی کالا سال‌ها است که به انتخاب اول بسیاری از خریداران اینترنتی
            تبدیل شده است. دیجی کالا به عنوان بزرگ‌ترین و معتبرترین فروشگاه
            آنلاین ایران، شناخته‌شده‌ترین فروشگاه نیز محسوب می‌شود. این فروشگاه
            آنلاین نه‌تنها گسترده‌ترین تنوع کالا را در دسته‌بندی‌های مختلف ارائه
            می‌دهد، بلکه با خدمات بی‌نظیر، ارسال سریع، ضمانت اصل بودن کالا و
            پشتیبانی حرفه‌ای، استاندارد جدیدی در خرید اینترنتی ایران تعریف کرده
            است.
          </p>

          {!showMore && (
            <>
              <div className="absolute bottom-0 left-0 right-0 h-25 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
              <button
                onClick={() => setShowMore(true)}
                className="absolute -bottom-8 right-0 text-red-600 text-sm hover:text-red-800 transition-all duration-700 font-medium flex gap-2 cursor-pointer"
              >
                مشاهده بیشتر
                <ChevronDown />
              </button>
            </>
          )}
        </div>

        <div
          className={`overflow-hidden transition-all duration-700 ease-in-out ${
            showMore ? "max-h-[2000px] opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="w-full text-sm text-gray-600">
            <h5 className="text-[#62666D] text-xl my-3">
              ارسال سریع و مطمئن کالا
            </h5>
            <p className="text-[#979A9F] text-sm leading-7">
              یکی از مهم‌ترین دغدغه‌های کاربران خرید آنلاین، زمان تحویل کالا
              است. دیجی کالا برای حل این مشکل، گزینه‌های مختلف ارسال را در نظر
              گرفته است تا کاربران بتوانند بر اساس نیاز خود، روش ارسال مناسب را
              انتخاب کنند. به عنوان مثال، ارسال کالا به صورت تحویل امروز با
              ارسال سریع دیجی‌کالا، از جمله روش‌های خرید سریع از این فروشگاه
              اینترنتی است. این امکانات باعث می‌شود که خریداران بتوانند سفارش
              خود را در کوتاه‌ترین زمان ممکن دریافت کنند. علاوه بر این، در صورتی
              که کالای خریداری شده از لحاظ کیفیت یا هر دلیل دیگری رضایت مشتری را
              جلب نکرده باشد، دیجی کالا ضمانت بازگشت کالا را ارائه می‌دهد. این
              ویژگی موجب اعتماد بیشتر مشتریان به خرید آنلاین از فروشگاه اینترنتی
              دیجی کالا شده است.
            </p>
            <h5 className="text-[#62666D] text-xl my-3">
              تخفیف های ویژه و جشنواره ها
            </h5>
            <p className="text-[#979A9F] text-sm leading-7">
              دیجی کالا به طور منظم جشنواره‌ها و تخفیف‌های ویژه‌ای را برگزار
              می‌کند که برای مشتریان فرصت خرید کالاهای باکیفیت با قیمت‌های مناسب
              به همراه خواهد داشت. این تخفیف‌ها در ایام خاص مانند بلک فرایدی یا
              همان حراج جمعه سیاه، خرید هدیه روز مادر و کادو روز پدر، شب یلدا و
              جشنواره‌های فصلی تابستان و زمستان توجه بسیاری از خریداران را جلب
              می‌کند. در این جشنواره‌ها، دیجی کالا تخفیف‌های عالی روی محصولات
              مختلف از جمله گوشی‌های موبایل، لپ تاپ‌ها، تلویزیون‌ها، و حتی
              محصولات مناسب سازمانی مثل پک هدیه یلدا ارائه می‌دهد. می‌توانید
              گوشی ایفون ۱۶ یا گوشی S25 را با تخفیف‌های ویژه خریداری کنید و از
              قیمت مناسب بهره‌مند شوید. دیجی کالا فراتر از یک فروشگاه اینترنتی،
              یک تجربه خرید مطمئن در بین کاربران مختلف بوده است که با ارائه
              بزرگ‌ترین تنوع کالا، قیمت‌های مختلف و خدماتی بی‌نقص، به مقصد اول
              خریداران آنلاین در ایران تبدیل شده است.
            </p>
            <h5 className="text-[#62666D] text-xl my-3">
              انواع محصولات فروشگاه دیجی کالا
            </h5>
            <p className="text-[#979A9F] text-sm leading-7">
              دیجی کالا دارای محصولات متنوعی در گروه‌های مختلف است که خرید آنها
              بسیار راحت و سریع است. به عنوان مثال، اگر به دنبال قاب گوشی یا
              هندزفری بلوتوثی باشید، می‌توانید مدل‌های مختلف و برندهای گوناگونی
              را در این فروشگاه پیدا کنید.
            </p>
          </div>
          <button
            onClick={() => setShowMore(false)}
            className="text-red-600 text-sm hover:text-red-800 transition font-medium mt-2 text-left flex gap-2 cursor-pointer"
          >
            مشاهده کمتر
            <ChevronUp />
          </button>
        </div>
      </div>

      <div className="hidden lg:flex w-full border-t border-gray-200 "></div>

      <p className="hidden lg:flex text-xs text-gray-400 leading-6  justify-center mt-6">
        برای استفاده از مطالب دیجی‌کالا، داشتن «هدف غیرتجاری» و ذکر «منبع»
        کافیست. تمام حقوق این وب‌سایت نیز برای شرکت نوآوران فن آوازه (فروشگاه
        آنلاین دیجی‌کالا) است.
      </p>

    </footer>
  );
}