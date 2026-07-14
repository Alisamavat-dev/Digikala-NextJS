"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SelectCategory from "../../_component/select_category";
import SelectBrand from "../../_component/select_brand";
import SelectMedia from "../../_component/select_media";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/ui/button";

const productSchema = z.object({
  name: z
    .string()
    .min(3, "نام محصول باید حداقل ۳ حرف باشد")
    .optional()
    .or(z.literal("")),
  price: z
    .string()
    .min(1, "قیمت محصول نمی‌تواند خالی باشد")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "قیمت باید یک عدد معتبر و مثبت باشد",
    })
    .optional()
    .or(z.literal("")),
  sale: z
    .string()
    .min(1, "درصد تخفیف نمی‌تواند خالی باشد")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "درصد تخفیف باید عددی برابر یا بیشتر از ۰ باشد",
    })
    .optional()
    .or(z.literal("")),
  media: z
    .string()
    .refine((val) => val.split(",").filter((id) => id.trim()))
    .optional()
    .or(z.literal("")),
  category: z
    .string()
    .min(1, "لطفاً یک دسته‌بندی انتخاب کنید")
    .optional()
    .or(z.literal("")),
  brand: z
    .string()
    .min(1, "لطفاً یک برند انتخاب کنید")
    .optional()
    .or(z.literal("")),
});

export default function UpdateProducts({
  id,
  currentBrand,
  currentCategory,
  currentMedia,
  currentName,
  currentPrice,
  currentSale,
}) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedMedia, setSelectedMedia] = useState(new Set());
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["create_product"],
    mutationFn: async (formData) => {
      const formValues = {
        name: formData.get("title")?.trim() || "",
        price: formData.get("price")?.trim() || "",
        sale: formData.get("sale")?.trim() || "",
        media: formData.get("media")?.trim() || "",
        category: formData.get("categoryId") || "",
        brand: formData.get("brandId") || "",
      };
      const validationResult = productSchema.safeParse(formValues);

      if (!validationResult.success) {
        const flattened = validationResult.error.flatten();
        const allErrors = [
          ...(flattened.fieldErrors.name || []),
          ...(flattened.fieldErrors.price || []),
          ...(flattened.fieldErrors.sale || []),
          ...(flattened.fieldErrors.media || []),
          ...(flattened.fieldErrors.category || []),
          ...(flattened.fieldErrors.brand || []),
        ];

        throw allErrors;
      }

      const media = formData.get("media")
        ? formData.get("media").split(",").filter(Boolean)
        : currentMedia.map((item) => item._id);
      if (
        !formValues.name &&
        !formValues.price &&
        !formValues.sale &&
        !formValues.media &&
        !formValues.category &&
        !formValues.brand
      ) {
        throw new Error("حداقل یکی از فیلدها باید پر شود!");
      }

      const responseP = await fetch(`http://localhost:4000/api/product/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: formValues.name || currentName,
          price: Number(formValues.price || currentPrice),
          sale: Number(formValues.sale || currentSale),
          media,
          category: formValues.category || currentCategory,
          brand: formValues.brand || currentBrand,
        }),
      });

      if (!responseP.ok) {
        let errorData = null;

        try {
          errorData = await responseP.json();
        } catch {
          throw new Error("پاسخ سرور قابل پردازش نیست");
        }

        console.log("Backend Error:", errorData);

        if (errorData?.errors?.length) {
          throw errorData.errors;
        }

        if (errorData?.message) {
          throw new Error(errorData.message);
        }

        throw new Error("خطایی رخ داده است");
      }

      const js = await responseP.json();
      return js;
    },
    onSuccess: () => {
      setSelectedBrand("");
      setSelectedCategory("");

      setSelectedMedia(new Set());
      queryClient.invalidateQueries({ queryKey: ["product"] });
      router.push("/dashboard/products");
      toast.success(" تغییرات با موفقیت ثبت شد");
    },
    onError: (error) => {
      setSelectedBrand("");
      setSelectedCategory("");
      setSelectedMedia(new Set());

      console.log(error);

      if (Array.isArray(error)) {
        error.forEach((err) => {
          toast.error(err);
        });
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("خطایی رخ داده است");
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
            ویرایش محصول
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            اطلاعات محصول را ویرایش کنید
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
              placeholder={currentName}
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
              type="text"
              name="price"
              placeholder={currentPrice}
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
              type="text"
              name="sale"
              placeholder={currentSale}
              autoComplete="off"
            />
            <p className="text-[10px] text-gray-400 mt-0.5 px-1">
              درصد تخفیف محصول خود را بنویسید و درصورت نداشتن تخفیف مقدار آن را 0 بزارید
            </p>
          </div>
        </div>

        <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 bg-gray-50/50 hover:bg-gray-50 transition">
          <SelectMedia
            placeholder={currentMedia}
            selectedMedia={selectedMedia}
            setSelectedMedia={setSelectedMedia}
          />
        </div>

        <p className="text-[10px] text-gray-400 -mt-2 px-1">
          عکس یا عکس های مناسبی برای محصول خود انتخاب کنید
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="w-full sm:w-1/2">
            <SelectCategory
              placeholder={currentCategory}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>

          <div className="w-full sm:w-1/2">
            <SelectBrand
              placeholder={currentBrand}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
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
              در حال ویرایش...
            </span>
          ) : (
            "ویرایش محصول"
          )}
        </Button>
      </form>
    </>
  );
}