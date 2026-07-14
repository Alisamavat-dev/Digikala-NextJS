"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Ellipsis } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function SelectCategory({
  selectedCategory,
  setSelectedCategory,
  setSelectedCategoryId,
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { data, isPending } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await fetch("http://localhost:4000/api/category");
      return res.json();
    },
  });

  if (isPending) {
    return (
      <div className="w-full flex justify-center py-2">
        <Ellipsis className="text-gray-400" />
      </div>
    );
  }

  const handleSelect = (cat) => {
    setSelectedCategory(cat.name);
    if (setSelectedCategoryId) {
      setSelectedCategoryId(cat._id);
    }
    setOpen(false);
  };

  return (
    <div className="w-full relative" ref={wrapperRef}>
      <div
        className="w-full bg-white border border-gray-200 hover:border-gray-300 rounded-xl px-4 py-3 cursor-pointer transition-colors"
        onClick={() => setOpen(!open)}
      >
        <div className="flex justify-between items-center">
          <span className={`text-sm ${selectedCategory ? "text-gray-800 font-medium" : "text-gray-400"}`}>
            {selectedCategory || "دسته بندی"}
          </span>
          <ChevronDown
            size={18}
            className={`transition-transform duration-200 shrink-0 text-gray-500 ${open ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {open && (
        <div className="
          absolute left-0 right-0 top-full mt-1
          bg-white
          border border-gray-200
          rounded-xl
          shadow-xl
          z-999
          max-h-64
          overflow-y-auto
          py-1
        ">
          {data?.length > 0 ? (
            data.map((cat) => (
              <div
                key={cat._id}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleSelect(cat)}
              >
                <input
                  type="radio"
                  name="categoryId"
                  value={cat._id}
                  checked={selectedCategory === cat.name}
                  onChange={() => {}}
                  className="w-4 h-4 accent-red-500 shrink-0"
                />
                <span className="text-sm text-gray-700">{cat.name}</span>
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-400 px-4 py-3">
              هیچ دسته بندی‌ای یافت نشد
            </div>
          )}
        </div>
      )}

      <p className="text-[10px] text-gray-400 mt-1.5 px-1">
        دسته بندی محصول را انتخاب کنید
      </p>
    </div>
  );
}