"use client";

import { useState } from "react";
import Link from "next/link";
import {
  HomeIcon,
  ShoppingBagIcon,
  FolderIcon,
  TagIcon,
  PhotoIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import SignOut from "@/app/(panel)/_components/Sign-out-btn";

const navigation = [
  {
    name: "داشبورد",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    name: "محصولات",
    href: "/dashboard/products",
    icon: ShoppingBagIcon,
  },
  {
    name: "دسته‌بندی‌ها",
    href: "/dashboard/categories",
    icon: FolderIcon,
  },
  {
    name: "برندها",
    href: "/dashboard/brands",
    icon: TagIcon,
  },
  {
    name: "رسانه",
    href: "/dashboard/media",
    icon: PhotoIcon,
  },
];

export default function DashboardHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* لوگو - سایز متفاوت در موبایل */}
            <Link href="/dashboard" className="flex items-center gap-2">
              <img
                src="https://www.digikala.com/brand/full-horizontal.svg"
                className="w-28 sm:w-40 hover:scale-105 transition-transform duration-300 cursor-pointer"
                alt="دیجی‌کالا"
              />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>

            <nav className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 px-3 lg:px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-sm lg:text-base"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </nav>

            <div className="hidden md:block">
              <SignOut />
            </div>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed right-0 top-0 h-full w-72 bg-white shadow-xl z-50 md:hidden animate-slide-in">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <img
                  src="https://www.digikala.com/brand/full-horizontal.svg"
                  className="w-32"
                  alt="دیجی‌کالا"
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* آیتم‌های منو */}
              <div className="flex-1 overflow-y-auto py-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
              </div>

              <div className="border-t p-4">
                <SignOut />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
