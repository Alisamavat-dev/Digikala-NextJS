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
  Bell,
  Camera,
  ChevronLeft,
} from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isCategoryHovered, setIsCategoryHovered] = useState(false);
  const [activeCategory, setActiveCategory] = useState("موبایل");

  const categories = {
    موبایل: [
      "لوازم جانبی موبایل",
      "شارژر گوشی",
      "شارژر وایرلس",
      "شارژر تایپ سی",
      "کابل شارژ تایپ سی",
      "قاب گوشی",
      "گلس گوشی",
      "شارژر فندکی",
      "هولدر گوشی موبایل",
      "کابل شارژ و مبدل",
    ],
    "لپ تاپ": [
      "کیف لپ تاپ",
      "شارژر لپ تاپ",
      "موس",
      "کیبورد",
      "مونیتور",
      "هارد اکسترنال",
      "فلش مموری",
    ],
    "کالای دیجیتال": [
      "هدفون",
      "اسپیکر",
      "ساعت هوشمند",
      "دوربین",
      "پاوربانک",
      "هندزفری",
    ],
    "خانه و آشپزخانه": [
      "ظروف",
      "لوازم دکوری",
      "سرویس قاشق و چنگال",
      "تابه و قابلمه",
      "لوازم پذیرایی",
    ],
    "لوازم خانگی برقی": [
      "یخچال",
      "ماشین لباسشویی",
      "جاروبرقی",
      "مایکروویو",
      "سرمایشی و گرمایشی",
    ],
    "آرایشی بهداشتی": [
      "عطر و ادکلن",
      "لوازم آرایش",
      "مراقبت پوست",
      "مراقبت مو",
      "بهداشت دهان",
    ],
    "مد و پوشاک": ["تیشرت", "پیراهن", "شلوار", "کفش", "کیف و کمد", "عینک"],
    "طلا و نقره": ["دستبند", "گردنبند", "انگشتر", "گوشواره", "سکه"],
    "کتاب و هنر": ["لوازم تحریر", "کتاب و مجله", "آلات موسیقی"],
  };

  return (
    <>
      {isCategoryHovered && <div className="fixed inset-0 bg-black/50 z-40" />}

      <header id="top" className="bg-white border-b border-[#D0D0D0] relative z-50">
        <div className="relative w-full h-10 md:h-15 cursor-pointer">
          <Image
            src="/videos/headertop.gif"
            alt="header animation"
            fill
            unoptimized
            priority
            className="object-cover"
          />
        </div>

        <div className="hidden lg:block w-full px-5 pt-3 ">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex">
              <Image src="/photo/logo.svg" width={195} height={30} alt="logo" />
            </Link>
            <div className=" w-full flex justify-between ">
              <div className="flex w-[50%]  relative">
                <input
                  type="text"
                  placeholder="جستجو"
                  className="w-full py-2.5 pr-10 text-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-[#F0F0F1] bg-[#F0F0F1]"
                />
                <Search
                  className="absolute right-3 top-2.5 text-gray-400"
                  size={20}
                />
              </div>

              <div className="flex items-center gap-3">
                <Link href="/sign-in" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl border border-gray-300 transition cursor-pointer">
                  <User size={20} />
                  <p>ورود | ثبت نام</p>
                </Link>

                <button className="p-2.5 rounded-full hover:bg-gray-100 transition relative cursor-pointer">
                  <ShoppingCart size={22} />
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
              <button className="text-gray-700 nav-item flex items-center gap-1 font-medium cursor-pointer">
                <div className="flex justify-center items-center gap-2">
                  <Menu size={18} />
                  <p>دسته‌بندی کالاها</p>
                </div>
              </button>

              {isCategoryHovered && (
                <div className="absolute right-0 w-180 bg-white rounded-md shadow-xl border border-gray-100 z-50 flex">
                  <div className="w-65 border-l border-gray-100 p-2">
                    {Object.keys(categories).map((cat) => (
                      <div
                        key={cat}
                        className={`flex items-center justify-between text-sm py-2.5 px-3 rounded-md cursor-pointer transition ${
                          activeCategory === cat
                            ? "bg-red-50 text-red-500"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                        onMouseEnter={() => setActiveCategory(cat)}
                      >
                        <p>{cat}</p>
                        <ChevronLeft
                          size={16}
                          className={
                            activeCategory === cat
                              ? "text-red-500"
                              : "text-gray-400"
                          }
                        />
                      </div>
                    ))}
                  </div>

                  <div className="w-3/5 p-3">
                    <div className="border-b border-gray-100 pb-2 mb-2">
                      <div className="text-sm font-medium text-red-500 hover:text-red-700 cursor-pointer flex items-center justify-between">
                        <p>همه محصولات {activeCategory}</p>
                        <ChevronLeft size={16} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                      {categories[activeCategory]?.map((subItem, idx) => (
                        <div
                          key={idx}
                          className="text-sm text-gray-700 py-1.5 hover:text-red-500 cursor-pointer transition"
                        >
                          {subItem}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <p className="text-gray-300 pb-3">|</p>

            <Link href="/" className="text-gray-500 nav-item cursor-pointer">
              <div className="flex justify-center items-center gap-2">
                <PercentCircle size={16} />
                <p className="text-[14px]"> شگفت‌انگیزها</p>
              </div>
            </Link>
            <Link href="/" className="text-gray-500 nav-item">
              <div className="flex justify-center items-center gap-2">
                <StoreIcon size={16} />
                <p className="text-[14px]"> سوپرمارکت</p>
              </div>
            </Link>
            <Link href="/" className="text-gray-500 nav-item">
              <div className="flex justify-center items-center gap-2">
                <DollarSign size={16} />
                <p className="text-[14px]"> طلا و نقره دیجیتال</p>
              </div>
            </Link>
            <Link href="/" className="text-gray-500 nav-item">
              <div className="flex justify-center items-center gap-2">
                <Flame size={16} />
                <p className="text-[14px]"> پرفروش ترین ها</p>
              </div>
            </Link>

            <p className="text-gray-300 pb-3">|</p>
            <button className="text-gray-500 nav-item flex items-center gap-1 cursor-pointer">
              <p className="text-[14px]">سوالی دارید ؟</p>
            </button>
          </div>
        </div>

        <div className="block lg:hidden px-3 py-1 bg-gray-200 ">
          <div className="w-full flex items-center gap-3 mt-3 pb-2">
            <div className="h-18 w-[16%] bg-white rounded-md flex flex-wrap justify-center cursor-pointer">
              <Image
                src="/photo/service.png"
                width={40}
                height={40}
                alt="service"
              />
              <p className="w-full text-xs text-center">سرویس ها</p>
            </div>
            <div className="h-18 w-[16%] bg-[#E40138] rounded-md flex flex-wrap justify-center cursor-pointer">
              <Image src="/photo/digi.png" width={40} height={40} alt="digi" />
              <p className="w-full text-xs text-white text-center">دیجی کالا</p>
            </div>
            <div className="h-18 w-[16%] bg-white rounded-md flex flex-wrap justify-center cursor-pointer">
              <Image src="/photo/45.png" width={40} height={40} alt="45" />
              <p className="w-full text-xs text-center">45 دقیقه ای</p>
            </div>
            <div className="h-18 w-[16%] bg-white rounded-md flex flex-wrap justify-center cursor-pointer">
              <Image src="/photo/gold.gif" width={40} height={40} alt="gold"/>
              <p className="w-full text-xs text-center">طلا و نقره</p>
            </div>
            <div className="h-18 w-[16%] bg-white rounded-md flex flex-wrap justify-center cursor-pointer">
              <Image
                src="/photo/supermarket.png"
                width={40}
                height={40}
                alt="supermarket"
              />
              <p className="w-full text-xs text-center">سوپرمارکت</p>
            </div>
            <div className="h-18 w-[16%] bg-white rounded-md flex flex-wrap justify-center cursor-pointer">
              <Image src="/photo/shop.png" width={40} height={40} alt="shop" />
              <p className="w-full text-xs text-center">اعتبار خرید</p>
            </div>
          </div>

          <div className="relative w-full mt-3 flex gap-2">
            <div className="w-[95%] relative">
              <input
                type="text"
                placeholder="جستجو در "
                className="w-full py-2.5 pr-10 pl-12 text-sm bg-[#ffffff] rounded-3xl focus:outline-none focus:ring-1 focus:ring-white placeholder:text-gray-400"
              />
              <Search
                className="absolute right-3.5 top-2.5 text-gray-400"
                size={18}
              />
              <Image
                src="/photo/logo2.svg"
                width={70}
                height={100}
                className="absolute right-25 top-2.5"
                alt="logo2"
              />
              <Camera
                size={21}
                className="absolute left-3.5 top-2.25 text-[#884EED] cursor-pointer"
              />
            </div>

            <div className="w-9 h-9 mt-0.5 bg-[#ffffff] rounded-full flex items-center justify-center cursor-pointer">
              <Bell size={20} color="#424750" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}