"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import SelectCategory from "../../_component/select_category";
import SelectBrand from "../../_component/select_brand";
import Button from "@/ui/button";
import SelectMedia from "../../_component/select_media";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

const productSchema = z.object({
  name: z.string().min(3, "نام محصول باید حداقل ۳ حرف باشد"),
  price: z.string().min(1, "قیمت محصول نمی‌تواند خالی باشد"),
  sale: z.string().min(1, "درصد تخفیف نمی‌تواند خالی باشد"),
  media: z.string().min(1, "حداقل یک عکس باید انتخاب شود"),
  category: z.string().min(1, "لطفاً یک دسته‌بندی انتخاب کنید"),
  brand: z.string().min(1, "لطفاً یک برند انتخاب کنید"),
});

export default function CreateProduct() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState("");
  const [selectedMedia, setSelectedMedia] = useState(new Set());

  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create_product"],

    mutationFn: async (formData) => {
      const mediaIds = Array.from(selectedMedia);

      const formValues = {
        name: formData.get("title")?.trim() || "",
        price: formData.get("price")?.trim() || "",
        sale: formData.get("sale")?.trim() || "",
        media: mediaIds.join(","),
        category: selectedCategoryId || "",
        brand: selectedBrandId || "",
      };

      const validation = productSchema.safeParse(formValues);

      if (!validation.success) {
        const flat = validation.error.flatten();
        throw [
          ...(flat.fieldErrors.name || []),
          ...(flat.fieldErrors.price || []),
          ...(flat.fieldErrors.sale || []),
          ...(flat.fieldErrors.media || []),
          ...(flat.fieldErrors.category || []),
          ...(flat.fieldErrors.brand || []),
        ];
      }

      const payload = {
        name: formValues.name,
        price: Number(formValues.price),
        sale: Number(formValues.sale),
        media: mediaIds,
        category: selectedCategoryId,
        brand: selectedBrandId,
      };

      console.log("📦 Payload:", payload);

      try {
        const res = await fetch("http://localhost:4000/api/product", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`خطا در ثبت محصول (${res.status})`);
        }

        const data = await res.json();
        return data;
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error("خطا در ارتباط با سرور");
      }
    },

    onSuccess: () => {
      setSelectedBrand("");
      setSelectedCategory("");
      setSelectedCategoryId("");
      setSelectedBrandId("");
      setSelectedMedia(new Set());

      queryClient.invalidateQueries({ queryKey: ["product"] });

      router.push("/dashboard/products");

      toast.success("محصول با موفقیت ثبت شد");
    },

    onError: (error) => {
      setSelectedBrand("");
      setSelectedCategory("");
      setSelectedCategoryId("");
      setSelectedBrandId("");
      setSelectedMedia(new Set());

      if (Array.isArray(error)) {
        error.forEach((e) => toast.error(e));
      } else {
        toast.error(error?.message || "خطا");
      }
    },
  });

  return (
    <>
      <Toaster position="top-left" />

      <form
        action={mutate}
        className="
          w-full
          max-w-md
          mx-auto
          my-8
          bg-white
          rounded-2xl
          shadow-md
          p-6
          flex flex-col gap-5
        "
      >
        <div className="border-b border-gray-100 pb-4">
          <h1 className="text-lg font-bold text-gray-800">
            ساخت محصول
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            یک محصول جدید به فروشگاه اضافه کنید
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">نام محصول</label>
            <input
              className="
                w-full h-11
                px-4
                rounded-xl
                border border-gray-200
                bg-gray-50
                focus:outline-none
                focus:ring-2 focus:ring-red-500/50
                focus:border-red-500
                transition
                placeholder:text-gray-400
                text-sm
              "
              type="text"
              name="title"
              placeholder="نام محصول"
              autoComplete="off"
            />
            <p className="text-[10px] text-gray-400 mt-0.5 px-1">
              یک نام کوتاه برای محصول خود انتخاب کنید
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">قیمت محصول</label>
            <input
              className="
                w-full h-11
                px-4
                rounded-xl
                border border-gray-200
                bg-gray-50
                focus:outline-none
                focus:ring-2 focus:ring-red-500/50
                focus:border-red-500
                transition
                placeholder:text-gray-400
                text-sm
              "
              type="number"
              name="price"
              placeholder="قیمت"
              autoComplete="off"
            />
            <p className="text-[10px] text-gray-400 mt-0.5 px-1">
              قیمت محصول خود را به تومان بنویسید
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">درصد تخفیف</label>
            <input
              className="
                w-full h-11
                px-4
                rounded-xl
                border border-gray-200
                bg-gray-50
                focus:outline-none
                focus:ring-2 focus:ring-red-500/50
                focus:border-red-500
                transition
                placeholder:text-gray-400
                text-sm
              "
              type="number"
              name="sale"
              placeholder="درصد تخفیف"
              autoComplete="off"
            />
            <p className="text-[10px] text-gray-400 mt-0.5 px-1">
              درصد تخفیف محصول خود را بنویسید و درصورت نداشتن تخفیف مقدار آن را 0 بزارید
            </p>
          </div>
        </div>

        <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 bg-gray-50/50 hover:bg-gray-50 transition">
          <input type="hidden" name="media" value={Array.from(selectedMedia).join(",")} />
          <SelectMedia
            selectedMedia={selectedMedia}
            setSelectedMedia={setSelectedMedia}
          />
        </div>

        <p className="text-[10px] text-gray-400 -mt-2 px-1">
          عکس یا عکس های مناسبی برای محصول خود انتخاب کنید
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="w-full sm:w-1/2">
            <input type="hidden" name="categoryId" value={selectedCategoryId} />
            <SelectCategory
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              setSelectedCategoryId={setSelectedCategoryId}
            />
          </div>

          <div className="w-full sm:w-1/2">
            <input type="hidden" name="brandId" value={selectedBrandId} />
            <SelectBrand
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              setSelectedBrandId={setSelectedBrandId}
            />
          </div>
        </div>

        <Button
          disabled={isPending}
          className="
            w-full h-11
            rounded-xl
            bg-linear-to-r from-red-500 to-pink-500
            text-white
            font-medium
            hover:shadow-lg
            hover:shadow-red-500/25
            active:scale-98
            transition-all
            duration-200
            disabled:opacity-50
            disabled:cursor-not-allowed
            disabled:hover:shadow-none
          "
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              در حال ساخت...
            </span>
          ) : (
            "ساخت محصول"
          )}
        </Button>
      </form>
    </>
  );
}