"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  ShoppingBagIcon,
  FolderIcon,
  TagIcon,
  PhotoIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import SignOut from "@/app/(auth)/_components/Sign-out-btn";

const navigation = [
  { name: "داشبورد", href: "/dashboard", icon: HomeIcon },
  { name: "محصولات", href: "/dashboard/products", icon: ShoppingBagIcon },
  { name: "دسته‌بندی‌ها", href: "/dashboard/category", icon: FolderIcon },
  { name: "برندها", href: "/dashboard/brand", icon: TagIcon },
  { name: "رسانه", href: "/dashboard/media", icon: PhotoIcon },
];

export default function DashboardHeader() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="px-6 py-4 flex items-center justify-between">

          <button
            onClick={() => setSidebarOpen(true)}
            className="p-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-300"
          >
            <Bars3Icon className="w-6 h-6 text-gray-700" />
          </button>

          <Link href="/dashboard">
            <Image
              src="https://www.digikala.com/brand/full-horizontal.svg"
              width={150}
              height={40}
              alt="دیجی‌کالا"
              priority
            />
          </Link>

          <div className="hidden md:block">
            <SignOut />
          </div>
        </div>
      </header>

      {/* OVERLAY */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-all duration-300 ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 right-0 h-screen w-80 bg-white z-50 border-l border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">

          {/* TOP */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <Image
              src="https://www.digikala.com/brand/full-horizontal.svg"
              width={140}
              height={35}
              alt="دیجی‌کالا"
            />

            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-xl hover:bg-gray-100 transition-all"
            >
              <XMarkIcon className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* NAV */}
          <div className="flex-1 p-4 overflow-y-auto">
            {navigation.map((item) => {
              const active =
                pathname === item.href ||
                pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-4 mb-2 rounded-2xl transition-all duration-300 ${
                    active
                      ? "bg-red-50 text-red-500"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* FOOTER */}
          <div className="border-t border-gray-100 p-4">
            <SignOut />
          </div>

        </div>
      </aside>
    </>
  );
}