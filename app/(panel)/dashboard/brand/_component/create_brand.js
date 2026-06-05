"use client";

import Button from "@/Ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";

const createBrandSchema = z.object({
  name: z
    .string()
    .min(3, { message: "نام برند حداقل باید 3 حرف باشد" })
    .max(10, { message: "نام برند باید حداکثر 10 کاراکتر باشد" })
    .regex(/^[آ-ی\s]+$/, {
      message: "نام برند فقط می‌تواند فارسی باشد",
    })
    .trim(),

  logo: z
    .string()
    .min(1, "آدرس لوگو نمی‌تواند خالی باشد")
    .url("آدرس لوگو معتبر نیست"),
});

export default function CreateBrand() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-brand"],
    mutationFn: async (formData) => {
      const name = formData.get("name");
      const logo = formData.get("logo");

      const result = createBrandSchema.safeParse({ name, logo });

      if (!result.success) {
        const flattened = result.error.flatten();
        const allErrors = [
          ...(flattened.fieldErrors.name || []),
          ...(flattened.fieldErrors.logo || []),
        ];

        throw allErrors;
      }

      const response = await fetch("http://localhost:4000/api/brand", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: formData.get("name"),
          logo: formData.get("logo"),
        }),
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(" برند مورد نظر یافت نشد! ");
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
      queryClient.invalidateQueries({ queryKey: ["brand"] });
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
              نام برند
            </label>
          </div>
          <div className="fl-field p-[2px] w-[280px]">
            <input
              className="fl-input w-[270px] h-[40px] rounded-lg"
              type="text"
              name="logo"
              placeholder=" "
              autoComplete="off"
            />
            <label className="fl-label right-[20px] top-[13px] ">
              آدرس لوگو
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
