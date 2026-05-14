"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Upload, Loader2, X } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

export default function CreateMediaForm() {
  const queryClient = useQueryClient();
  const [url, setUrl] = useState("");

  const createMediaMutation = useMutation({
    mutationFn: async ({ url }) => {
      const res = await fetch("http://localhost:4000/api/media", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
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
      toast.error(error.message || "مشکلی در ارتباط با سرور پیش آمده است");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!url.trim()) {
      toast.error("لطفاً آدرس URL رسانه را وارد کنید");
      return;
    }

    createMediaMutation.mutate({ url });
  };

  return (
    <>
      <Toaster position="bottom-left" />
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 mb-8"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          افزودن رسانه جدید
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              آدرس URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
              dir="ltr"
              required
            />
          </div>

          {url && (
            <div className="relative w-32 h-32 border rounded-lg overflow-hidden bg-gray-50">
              <img
                src={url}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/128?text=Invalid+URL";
                }}
              />
              <button
                type="button"
                onClick={() => setUrl("")}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={createMediaMutation.isPending || !url.trim()}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
