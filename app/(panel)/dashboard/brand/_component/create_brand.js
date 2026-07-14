"use client";

import Button from "@/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { useState } from "react";

const createBrandSchema = z.object({
  name: z
    .string()
    .min(3, "نام برند حداقل 3 حرف باشد")
    .max(10, "حداکثر 10 کاراکتر")
    .regex(/^[آ-ی\s]+$/, "فقط فارسی مجاز است")
    .trim(),

  logo: z.string().url("آدرس لوگو معتبر نیست"),
});

export default function CreateBrand() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    name: "",
    logo: "",
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-brand"],
    mutationFn: async ({ name, logo }) => {
      const result = createBrandSchema.safeParse({ name, logo });

      if (!result.success) {
        throw result.error.flatten().fieldErrors;
      }

      const response = await fetch("http://localhost:4000/api/brand", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, logo }),
      });

      if (!response.ok) {
        throw new Error("خطا در ثبت برند");
      }

      return response.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brand"] });
      toast.success("برند ساخته شد");

      setForm({ name: "", logo: "" });
    },

    onError: (error) => {
      if (error?.name) error.name.forEach((e) => toast.error(e));
      else if (error?.logo) error.logo.forEach((e) => toast.error(e));
      else toast.error(error?.message || "خطا");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(form);
  };

  return (
    <>
      <Toaster position="top-left" />

      <form
        onSubmit={handleSubmit}
        className="
          w-full
          max-w-md
          bg-white
          rounded-2xl
          p-6
          flex
          flex-col
          gap-4
        "
      >
        {/* TITLE */}
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            ساخت برند جدید
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            اطلاعات برند را وارد کنید
          </p>
        </div>

        {/* NAME */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">نام برند</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="
              w-full
              h-11
              px-3
              rounded-xl
              border
              border-gray-200
              bg-gray-50
              focus:outline-none
              focus:ring-2
              focus:ring-red-500
              transition
            "
            placeholder="مثلاً دیجی کالا"
          />
        </div>

        {/* LOGO */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">لوگو (URL)</label>
          <input
            value={form.logo}
            onChange={(e) => setForm({ ...form, logo: e.target.value })}
            className="
              w-full
              h-11
              px-3
              rounded-xl
              border
              border-gray-200
              bg-gray-50
              focus:outline-none
              focus:ring-2
              focus:ring-red-500
              transition
            "
            placeholder="https://..."
          />
        </div>

        {/* BUTTON */}
        <Button
          disabled={isPending}
          className="
            w-full
            h-11
            rounded-xl
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
          "
        >
          {isPending ? "در حال ساخت..." : "ساخت برند"}
        </Button>
      </form>
    </>
  );
}