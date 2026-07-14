"use client";

import Button from "@/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Check, Loader2, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function SelectMedia({ selectedMedia, setSelectedMedia }) {
  const [open, setOpen] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: ["media"],
    queryFn: async () => {
      const res = await fetch("http://localhost:4000/api/media");
      const js = await res.json();
      return js;
    },
  });

  const toggle = (id) => {
    setSelectedMedia((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectedItems = data?.filter((m) => selectedMedia.has(m._id)) || [];

  return (
    <div className="w-full max-w-md relative">

      <div
        onClick={() => setOpen(true)}
        className="flex flex-col gap-1 cursor-pointer"
      >
        <label className="text-xs text-gray-500">رسانه‌ها</label>
        <div className="w-full h-11 px-3 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-red-500">
          <span className="text-sm text-gray-500">
            {selectedMedia.size > 0
              ? `${selectedMedia.size} تصویر انتخاب شده`
              : "انتخاب رسانه"}
          </span>
        </div>
      </div>

      {selectedItems.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedItems.map((img) => (
            <div key={img._id} className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
              <Image
                src={img.url}
                alt=""
                width={45}
                height={45}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {open && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-6 max-h-[80vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-800">انتخاب رسانه</h2>
                <p className="text-xs text-gray-400">تصاویر مورد نظر را انتخاب کنید</p>
              </div>
              <Button
                type="button"
                click={() => setOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                <X size={16} />
              </Button>
            </div>

            {isPending ? (
              <div className="flex justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-red-500" />
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {data?.length > 0 ? (
                  data.map((media) => {
                    const isSelected = selectedMedia.has(media._id);

                    return (
                      <button
                        key={media._id}
                        type="button"
                        onClick={() => toggle(media._id)}
                        className="relative group"
                      >
                        <div className={`
                          w-full aspect-square rounded-2xl border-2 overflow-hidden transition-all duration-200
                          ${isSelected 
                            ? 'border-red-500 shadow-md scale-95' 
                            : 'border-gray-200 hover:border-red-300 hover:scale-105'
                          }
                        `}>
                          <Image
                            src={media.url}
                            alt=""
                            width={120}
                            height={120}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {isSelected && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-lg">
                            <Check size={14} />
                          </div>
                        )}
                      </button>
                    );
                  })
                ) : (
                  <p className="text-center text-sm text-gray-400 col-span-full py-10">
                    هیچ رسانه‌ای یافت نشد
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}