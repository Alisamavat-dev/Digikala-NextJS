


"use client";

import Button from "@/Ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Ellipsis } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";

const updateBrandSchema = z.object({
  name: z.string().min(3, "نام برند حداقل باید 3 حرف باشد").max(10, "نام برند حداکثر 10 حرف باشد").regex(/^[آ-ی\s]+$/, "نام برند فقط فارسی باشد").optional().or(z.literal('')),
  logo: z.string().url("آدرس لوگو معتبر نیست").optional().or(z.literal('')),
})

export default function UpdateBrand({ id, currentName, currentLogo }) {
  const queryclient = useQueryClient();

  const { mutate, isPending  } = useMutation({
    mutationKey: ["update-brand"],
    mutationFn: async (formData) => {
      const name = formData.get("name");
      const logo = formData.get("logo");

      const result = updateBrandSchema.safeParse({ 
        name: name?.toString().trim() || '', 
        logo: logo?.toString().trim() || '' 
      });
      
       if (!result.success) {
        const flattened = result.error.flatten();
        const allErrors = [
          ...(flattened.fieldErrors.name || []),
          ...(flattened.fieldErrors.logo || []),
        ];

        throw allErrors;
      }
if (!name && !logo) {
        throw new Error("حداقل یکی از فیلدها باید پر شود!");
      }
      const response = await fetch(`http://localhost:4000/api/brand/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: name || currentName,
          logo: logo || currentLogo,
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
      queryclient.invalidateQueries({ queryKey: ["brand"] });
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
          <div className="fl-field fl-field p-[2px] w-[280px]">
            <input
              className="fl-input w-[270px] placeholder:text-[9px] placeholder:text-[#8a8a8a81]  h-[40px] rounded-lg"
              type="text"
              name="name"
              placeholder={currentName}
              autoComplete="off"
            />
            <label className="fl-label right-[20px] !text-[11px] top-[6px]">
              نام برند
            </label>
          </div>
          <div className="fl-field p-[2px] w-[280px]">
            <input
              className="fl-input placeholder:text-[7px] text-[12px] placeholder:text-[#8a8a8a81] w-[270px] h-[40px]  rounded-lg"
              type="text"
              name="logo"
              placeholder={currentLogo}
              autoComplete="off"
            />
            <label className="fl-label right-[20px] top-[6px]">آدرس لوگو</label>
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