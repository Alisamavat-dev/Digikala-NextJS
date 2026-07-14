"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Search,
  User,
  Menu,
  ShoppingCart,
  Flame,
  DollarSign,
  StoreIcon,
  PercentCircle,
  Camera,
  ChevronLeft,
  LogIn,
  Smartphone,
  Laptop,
  Headphones,
  Home,
  WashingMachine,
  Sparkles,
  Shirt,
  Gem,
  BookOpen,
} from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isCategoryHovered, setIsCategoryHovered] = useState(false);
  const [activeCategory, setActiveCategory] = useState("موبایل");

  const categories = {
    "موبایل و لوازم جانبی": {
      icon: Smartphone,
      items: [
        "گوشی موبایل",
        "لوازم جانبی موبایل",
        "شارژر و کابل",
        "قاب و گلس",
        "پاوربانک",
        "هولدر و پایه",
        "هدفون و هندزفری",
      ],
    },
    "لپ‌تاپ و کامپیوتر": {
      icon: Laptop,
      items: [
        "لپ‌تاپ",
        "کیف و کاور",
        "شارژر و باتری",
        "موس و کیبورد",
        "مانیتور",
        "هارد و فلش",
        "مودم و شبکه",
      ],
    },
    "کالای دیجیتال": {
      icon: Headphones,
      items: [
        "هدفون و هدست",
        "اسپیکر و ساندبار",
        "ساعت هوشمند",
        "دوربین و فیلمبرداری",
        "گیمینگ و کنسول",
        "کتابخوان الکترونیکی",
        "لوازم جانبی دیجیتال",
      ],
    },
    "خانه و آشپزخانه": {
      icon: Home,
      items: [
        "لوازم دکوری",
        "ظروف و سرویس",
        "لوازم پذیرایی",
        "تابه و قابلمه",
        "سرویس خواب و حوله",
        "لوازم نظافت",
        "سازماندهنده",
      ],
    },
    "لوازم خانگی برقی": {
      icon: WashingMachine,
      items: [
        "یخچال و فریزر",
        "ماشین لباسشویی",
        "جارو برقی",
        "مایکروویو و فر",
        "تهویه مطبوع",
        "چایساز و قهوه‌ساز",
        "لوازم آشپزخانه برقی",
      ],
    },
    "زیبایی و سلامت": {
      icon: Sparkles,
      items: [
        "عطر و ادکلن",
        "لوازم آرایشی",
        "مراقبت از پوست",
        "مراقبت از مو",
        "بهداشت دهان",
        "مکمل و ویتامین",
        "لوازم ورزشی",
      ],
    },
    "مد و پوشاک": {
      icon: Shirt,
      items: [
        "تیشرت و پیراهن",
        "شلوار و ست",
        "کت و کاپشن",
        "کفش و صندل",
        "کیف و کوله",
        "عینک آفتابی",
        "زیورآلات مردانه",
      ],
    },
    "طلا و جواهر": {
      icon: Gem,
      items: [
        "دستبند و النگو",
        "گردنبند و آویز",
        "انگشتر و حلقه",
        "گوشواره",
        "سکه و مدال",
        "ست طلا",
        "زیورآلات نقره",
      ],
    },
    "کتاب و هنر": {
      icon: BookOpen,
      items: [
        "کتاب و مجله",
        "لوازم تحریر",
        "نقاشی و هنر",
        "آلات موسیقی",
        "بازی فکری",
        "ساختنی و کاردستی",
        "کالای فرهنگی",
      ],
    },
  };

  return (
    <>
      {isCategoryHovered && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />
      )}
      <header
        id="top"
        className="bg-white border-b border-gray-200 relative z-50 shadow-sm w-full"
      >
        <div className="relative w-full h-10 md:h-15 cursor-pointer">
          <Image
            src="/videos/02b76179025097a263c9d1ecfed4e2ceeac05f5d_1781425447.webp"
            alt="header animation"
            fill
            unoptimized
            priority
            className="object-cover"
          />
        </div>

        <div className="hidden lg:block w-full max-w-350 mx-auto px-5 pt-3 pb-3">
          <div className="flex items-center gap-4">
            <Link href="/" className="shrink-0">
              <Image
                src="/photo/logo.svg"
                width={195}
                height={30}
                alt="logo"
              />
            </Link>
            <div className="w-full flex justify-between items-center">
              <div className="flex w-[50%] relative">
                <input
                  type="text"
                  placeholder="جستجو"
                  className="w-full py-2.5 pr-10 text-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400 bg-gray-100 placeholder:text-gray-400"
                />
                <Search
                  className="absolute right-3 top-2.5 text-gray-400"
                  size={20}
                />
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/sign-in"
                  className="flex items-center gap-2 px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-xl border border-gray-300 transition cursor-pointer hover:border-red-400 hover:text-red-500"
                >
                  <User size={20} />
                  <p className="text-sm font-medium">ورود | ثبت نام</p>
                </Link>

                <button className="p-2.5 rounded-full hover:bg-gray-100 transition relative cursor-pointer hover:text-red-500">
                  <ShoppingCart size={22} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                    ۰
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 mt-4 relative">
            <div
              className="relative"
              onMouseEnter={() => setIsCategoryHovered(true)}
              onMouseLeave={() => setIsCategoryHovered(false)}
            >
              <button className="text-gray-700 nav-item flex items-center gap-1 font-medium cursor-pointer hover:text-red-500 transition whitespace-nowrap">
                <div className="flex justify-center items-center gap-2">
                  <Menu size={18} />
                  <p className="text-sm">دسته‌بندی کالاها</p>
                </div>
              </button>

              {isCategoryHovered && (
                <div className="absolute right-0 w-180 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 flex overflow-hidden">
                  <div className="w-64 bg-gray-50/80 p-2">
                    {Object.keys(categories).map((cat) => {
                      const Icon = categories[cat].icon;
                      const isActive = activeCategory === cat;
                      return (
                        <div
                          key={cat}
                          className={`flex items-center justify-between text-sm py-3 px-3 rounded-xl cursor-pointer transition-all duration-200 ${
                            isActive
                              ? "bg-linear-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/25"
                              : "text-gray-700 hover:bg-white hover:shadow-sm"
                          }`}
                          onMouseEnter={() => setActiveCategory(cat)}
                        >
                          <div className="flex items-center gap-3">
                            <Icon
                              size={18}
                              className={
                                isActive ? "text-white" : "text-gray-500"
                              }
                            />
                            <p className={isActive ? "font-medium" : ""}>
                              {cat}
                            </p>
                          </div>
                          <ChevronLeft
                            size={16}
                            className={
                              isActive ? "text-white" : "text-gray-400"
                            }
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div className="w-3/5 p-4">
                    <div className="border-b border-gray-100 pb-3 mb-3">
                      <div className="text-sm font-medium text-red-500 hover:text-red-700 cursor-pointer flex items-center justify-between group">
                        <p>همه محصولات {activeCategory}</p>
                        <ChevronLeft
                          size={16}
                          className="group-hover:-translate-x-1 transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                      {categories[activeCategory]?.items.map(
                        (subItem, idx) => (
                          <div
                            key={idx}
                            className="text-sm text-gray-600 py-2 px-2 hover:bg-red-50 hover:text-red-500 rounded-lg cursor-pointer transition-all duration-200"
                          >
                            {subItem}
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="h-6 w-px bg-gray-200 shrink-0" />

            <div className="flex items-center gap-6 flex-wrap">
              <Link
                href="/"
                className="text-gray-500 nav-item cursor-pointer hover:text-red-500 transition whitespace-nowrap"
              >
                <div className="flex justify-center items-center gap-2">
                  <PercentCircle size={17} />
                  <p className="text-sm">شگفت‌انگیزها</p>
                </div>
              </Link>

              <Link
                href="/product"
                className="text-gray-500 nav-item hover:text-red-500 transition whitespace-nowrap"
              >
                <div className="flex justify-center items-center gap-2">
                  <StoreIcon size={17} />
                  <p className="text-sm">محصولات</p>
                </div>
              </Link>

              <Link
                href="/"
                className="text-gray-500 nav-item hover:text-red-500 transition whitespace-nowrap"
              >
                <div className="flex justify-center items-center gap-2">
                  <DollarSign size={17} />
                  <p className="text-sm">طلا و نقره دیجیتال</p>
                </div>
              </Link>

              <Link
                href="/"
                className="text-gray-500 nav-item hover:text-red-500 transition whitespace-nowrap"
              >
                <div className="flex justify-center items-center gap-2">
                  <Flame size={17} />
                  <p className="text-sm">پرفروش‌ترین‌ها</p>
                </div>
              </Link>

              <div className="h-6 w-px bg-gray-200 shrink-0" />

              <button className="text-gray-500 nav-item flex items-center gap-1 cursor-pointer hover:text-red-500 transition whitespace-nowrap">
                <p className="text-sm">سوالی دارید؟</p>
              </button>
            </div>
          </div>
        </div>

        <div className="block lg:hidden px-3 py-2 bg-gray-100">
          <div className="w-full flex items-center gap-2 mt-2 pb-2 overflow-x-auto scrollbar-hide">
            <div className="shrink-0 h-16 w-[16%] bg-white rounded-xl flex flex-wrap justify-center items-center cursor-pointer shadow-sm hover:shadow-md transition">
              <Image
                src="/photo/service.png"
                width={32}
                height={32}
                alt="service"
              />
              <p className="w-full text-[10px] text-center mt-0.5">
                سرویس‌ها
              </p>
            </div>
            <div className="shrink-0 h-16 w-[16%] bg-linear-to-r from-red-500 to-pink-500 rounded-xl flex flex-wrap justify-center items-center cursor-pointer shadow-sm hover:shadow-lg transition">
              <Image
                src="/photo/digi.png"
                width={32}
                height={32}
                alt="digi"
              />
              <p className="w-full text-[10px] text-white text-center mt-0.5 font-medium">
                دیجی‌کالا
              </p>
            </div>
            <div className="shrink-0 h-16 w-[16%] bg-white rounded-xl flex flex-wrap justify-center items-center cursor-pointer shadow-sm hover:shadow-md transition">
              <Image src="/photo/45.png" width={32} height={32} alt="45" />
              <p className="w-full text-[10px] text-center mt-0.5">
                ۴۵ دقیقه‌ای
              </p>
            </div>
            <div className="shrink-0 h-16 w-[16%] bg-white rounded-xl flex flex-wrap justify-center items-center cursor-pointer shadow-sm hover:shadow-md transition">
              <Image
                src="/photo/gold.gif"
                width={32}
                height={32}
                alt="gold"
              />
              <p className="w-full text-[10px] text-center mt-0.5">
                طلا و نقره
              </p>
            </div>
            <div className="shrink-0 h-16 w-[16%] bg-white rounded-xl flex flex-wrap justify-center items-center cursor-pointer shadow-sm hover:shadow-md transition">
              <Image
                src="/photo/supermarket.png"
                width={32}
                height={32}
                alt="supermarket"
              />
              <p className="w-full text-[10px] text-center mt-0.5">
                سوپرمارکت
              </p>
            </div>
            <div className="shrink-0 h-16 w-[16%] bg-white rounded-xl flex flex-wrap justify-center items-center cursor-pointer shadow-sm hover:shadow-md transition">
              <Image
                src="/photo/shop.png"
                width={32}
                height={32}
                alt="shop"
              />
              <p className="w-full text-[10px] text-center mt-0.5">
                اعتبار خرید
              </p>
            </div>
          </div>

          <div className="relative w-full mt-2 flex gap-2">
            <div className="w-[93%] relative">
              <input
                type="text"
                placeholder="جستجو در"
                className="w-full py-2.5 pr-10 pl-12 text-sm bg-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-400 placeholder:text-gray-400 shadow-sm"
              />
              <Search
                className="absolute right-3.5 top-2.5 text-gray-400"
                size={18}
              />
              <Image
                src="/photo/logo2.svg"
                width={65}
                height={100}
                className="absolute right-24 top-2.5"
                alt="logo2"
              />
              <Camera
                size={20}
                className="absolute left-3.5 top-2.5 text-purple-500 cursor-pointer hover:text-purple-600 transition"
              />
            </div>
            <Link href="/sign-in">
              <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center cursor-pointer hover:bg-gray-50 transition shadow-sm">
                <LogIn size={20} color="#424750" />
              </div>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}