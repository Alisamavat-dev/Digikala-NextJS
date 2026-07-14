"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Upload, Loader2, X } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import Image from "next/image";

export default function CreateMediaForm() {
  const queryClient = useQueryClient();
  const [url, setUrl] = useState("");

  const createMediaMutation = useMutation({
    mutationFn: async ({ url }) => {
      const res = await fetch("http://localhost:4000/api/media", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "خطا در اضافه کردن رسانه");
      }

      return res.json();
    },

    onSuccess: () => {
      setUrl("");
      toast.success("رسانه با موفقیت اضافه شد");
      queryClient.invalidateQueries({ queryKey: ["media"] });
    },

    onError: (error) => {
      toast.error(error.message || "خطا در ارتباط با سرور");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!url.trim()) {
      toast.error("URL را وارد کنید");
      return;
    }

    createMediaMutation.mutate({ url });
  };

  return (
    <>
      <Toaster position="bottom-left" />

      <form
        onSubmit={handleSubmit}
        className="
          bg-white
          rounded-3xl
          border
          border-gray-100
          shadow-sm
          p-6
          mb-8
          transition
          hover:shadow-md
        "
      >
        {/* TITLE */}
        <h2 className="text-lg font-bold text-gray-800 mb-5">
          افزودن رسانه جدید
        </h2>

        {/* INPUT */}
        <div className="flex flex-col gap-3">

          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            dir="ltr"
            className="
              w-full
              px-4
              py-3
              rounded-2xl
              border
              border-gray-200
              bg-gray-50
              text-gray-700
              focus:outline-none
              focus:ring-2
              focus:ring-red-500
              transition
            "
          />

          {/* PREVIEW */}
          {url && (
            <div className="relative w-36 h-36 rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
              <Image
                src={url}
                alt="preview"
                fill
                className="object-cover"
                unoptimized
              />

              <button
                type="button"
                onClick={() => setUrl("")}
                className="
                  absolute
                  top-2
                  right-2
                  bg-red-500
                  text-white
                  w-7
                  h-7
                  rounded-full
                  flex
                  items-center
                  justify-center
                  hover:bg-red-600
                  transition
                  shadow-md
                "
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={createMediaMutation.isPending || !url.trim()}
            className="
              w-full
              mt-2
              py-3
              rounded-2xl
              bg-linear-to-r
              from-red-500
              to-pink-500
              text-white
              font-medium
              flex
              items-center
              justify-center
              gap-2
              hover:opacity-90
              active:scale-[0.98]
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {createMediaMutation.isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                در حال افزودن...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                افزودن رسانه
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
}