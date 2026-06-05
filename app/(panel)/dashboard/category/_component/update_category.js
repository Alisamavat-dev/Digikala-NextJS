"use client";

import Button from "@/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Ellipsis } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";

const updateCategorySchema = z.object({
  name: z
    .string()
    .min(3, "نام دسته بندی حداقل باید 3 حرف باشد")
    .max(10, "نام دسته بندی حداکثر 10 حرف باشد")
    .regex(/^[آ-ی\s]+$/, "نام دسته بندی فقط فارسی باشد")
    .optional()
    .or(z.literal("")),
  en_name: z
    .string()
    .min(3, "نام  لاتین دسته بندی حداقل باید 3 حرف باشد")
    .max(10, "نام لاتین دسته بندی حداکثر 10 حرف باشد")
    .regex(/^[a-zA-Z\s]+$/, "نام لاتین دسته بندی نباید فارسی  باشد")
    .optional()
    .or(z.literal("")),
  image: z.string().url("آدرس عکس معتبر نیست").optional().or(z.literal("")),
});

export default function UpdateCategory({
  id,
  currentEn_Name,
  currentName,
  currentImage,
}) {
  const queryclient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["update-category"],
    mutationFn: async (formData) => {
      const name = formData.get("name");
      const en_name = formData.get("en_name");
      const image = formData.get("image");

      const result = updateCategorySchema.safeParse({
        name: name?.toString().trim() || "",
        en_name: en_name?.toString().trim() || "",
        image: image?.toString().trim() || "",
      });

      if (!result.success) {
        const flattened = result.error.flatten();
        const allErrors = [
          ...(flattened.fieldErrors.name || []),
          ...(flattened.fieldErrors.en_name || []),
          ...(flattened.fieldErrors.image || []),
        ];

        throw allErrors;
      }
      if (!name && !en_name && !image) {
        throw new Error("حداقل یکی از فیلدها باید پر شود!");
      }
      const response = await fetch(`http://localhost:4000/api/category/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: name || currentName,
          en_name: en_name || currentEn_Name,
          image: image || currentImage,
        }),
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(" سرور مورد نظر یافت نشد! ");
        } else if (response.status === 400) {
          throw new Error(" اطلاعات ارسالی صحیح نیست! ");
        } else if (response.status === 401) {
          throw new Error(" !شما دسترسی به این عملیات ندارید");
        } else if (response.status === 500) {
          throw new Error(" خطای سرور! لطفاً بعداً تلاش کنید");
        } else {
          throw new Error(` خطا ${response.status}: بروزرسانی انجام نشد`);
        }
      }
      const js = await response.json();
      return js;
    },
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["category"] });
      toast.success("تغییرات با موفقیت ثبت شد");
    },

    onError: (error) => {
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
      <form action={mutate}>
        <div className="flex flex-col gap-1.5 w-fit h-fit py-[10px]">
          <div className="fl-field  p-[2px] w-[280px]">
            <input
              className="fl-input w-[270px] placeholder:text-[9px] placeholder:text-[#8a8a8a81]  h-[40px] rounded-lg"
              type="text"
              name="name"
              placeholder={currentName}
              autoComplete="off"
            />
            <label className="fl-label right-[20px] !text-[11px] top-[6px]">
              نام دسته بندی
            </label>
          </div>
          <div className="fl-field  p-[2px] w-[280px]">
            <input
              className="fl-input w-[270px] placeholder:text-[9px] placeholder:text-[#8a8a8a81]  h-[40px] rounded-lg"
              type="text"
              name="en_name"
              placeholder={currentEn_Name}
              autoComplete="off"
            />
            <label className="fl-label right-[20px] !text-[11px] top-[6px]">
              نام لاتین دسته بندی
            </label>
          </div>

          <div className="fl-field p-[2px] w-[280px]">
            <input
              className="fl-input placeholder:text-[7px] text-[12px] placeholder:text-[#8a8a8a81] w-[270px] h-[40px]  rounded-lg"
              type="text"
              name="image"
              placeholder={currentImage}
              autoComplete="off"
            />
            <label className="fl-label right-[20px] top-[6px]">آدرس عکس</label>
          </div>
          <Button
            disabled={isPending}
            className={
              "bg-[#EF4056] text-white text-[15px] cursor-pointer w-[270px] h-[40px] rounded-lg mr-[2px]  "
            }
          >
            {isPending ? <Ellipsis className="m-[0_auto]" /> : "ویرایش"}
          </Button>
        </div>
      </form>
    </>
  );
}
