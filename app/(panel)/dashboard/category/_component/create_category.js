"use client";

import Button from "@/Ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";

const createCategorySchema = z.object({
  name: z
    .string()
    .min(3, { message: "نام دسته بندی حداقل باید 3 حرف باشد" })
    .max(10, { message: "نام دسته بندی باید حداکثر 10 کاراکتر باشد" })
    .regex(/^[آ-ی\s]+$/, {
      message: "نام دسته بندی فقط می‌تواند فارسی باشد",
    })
    .trim(),
     en_name: z.string().min(3, "نام  لاتین دسته بندی حداقل باید 3 حرف باشد").max(10, "نام لاتین دسته بندی حداکثر 10 حرف باشد").regex(/^[a-zA-Z\s]+$/, {
      message: "نام لاتین دسته بندی نمی‌تواند فارسی باشد",
    }),

  image: z
    .string()
    .min(1, "آدرس تصویر نمی‌تواند خالی باشد")
    .url("آدرس تصویر معتبر نیست"),
});

export default function CreateCategory() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-category"],
    mutationFn: async (formData) => {
      const name = formData.get("name");
      const en_name=formData.get("en_name");
      const image = formData.get("image");

      const result = createCategorySchema.safeParse({ name, image ,en_name });

      if (!result.success) {
        const flattened = result.error.flatten();
        const allErrors = [
          ...(flattened.fieldErrors.name || []),
          ...(flattened.fieldErrors.en_name || []),

          ...(flattened.fieldErrors.image || []),
        ];

        throw allErrors;
      }

      const response = await fetch("http://localhost:4000/api/category", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: formData.get("name"),
          en_name:formData.get("en_name"),
          image: formData.get("image"),
        }),
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(" دسته بندی مورد نظر یافت نشد! ");
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
      queryClient.invalidateQueries({ queryKey: ["category"] });
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
        <div className=" flex flex-col gap-1.5  w-fit h-fit py-[10px]">
          <div className="fl-field fl-field p-[2px] w-[280px]">
            <input
              className="fl-input w-[270px] h-[40px] rounded-lg"
              type="text"
              name="name"
              placeholder=" "
              autoComplete="off"
            />
            <label className="fl-label right-[20px] !text-[11px] top-[10px]">
              نام دسته بندی
            </label>
          </div>
          <div className="fl-field p-[2px] w-[280px]">
            <input
              className="fl-input w-[270px] h-[40px] rounded-lg"
              type="text"
              name="en_name"
              placeholder=" "
              autoComplete="off"
            />
            <label className="fl-label right-[20px] top-[13px] ">
              نام لاتین دسته بندی
            </label>
          </div>
          <div className="fl-field p-[2px] w-[280px]">
            <input
              className="fl-input w-[270px] h-[40px] rounded-lg"
              type="text"
              name="image"
              placeholder=" "
              autoComplete="off"
            />
            <label className="fl-label right-[20px] top-[13px] ">
              آدرس تصویر
            </label>
          </div>
          <Button
            disabled={isPending}
            className={
              "bg-[#EF4056] text-white text-[15px]  cursor-pointer w-[270px] h-[40px] rounded-lg  mr-[2px]"
            }
          >
            ساخت
          </Button>
        </div>
      </form>
    </>
  );
}
