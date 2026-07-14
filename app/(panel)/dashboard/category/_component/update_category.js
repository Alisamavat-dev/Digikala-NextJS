"use client";

import Button from "@/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { z } from "zod";

const updateBrandSchema = z.object({
  name: z
    .string()
    .min(3, "نام برند حداقل 3 حرف باشد")
    .max(10, "حداکثر 10 حرف")
    .regex(/^[آ-ی\s]+$/, "فقط فارسی")
    .optional()
    .or(z.literal("")),

  logo: z.string().url("URL معتبر نیست").optional().or(z.literal("")),
});

export default function UpdateBrand({ id, currentName, currentLogo }) {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    name: currentName,
    logo: currentLogo,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["update-brand", id],

    mutationFn: async ({ name, logo }) => {
      const result = updateBrandSchema.safeParse({ name, logo });

      if (!result.success) {
        throw result.error.flatten().fieldErrors;
      }

      if (!name && !logo) {
        throw new Error("حداقل یک فیلد باید تغییر کند");
      }

      const res = await fetch(`http://localhost:4000/api/brand/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, logo }),
      });

      if (!res.ok) {
        throw new Error("خطا در بروزرسانی برند");
      }

      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brand"] });
      toast.success("برند بروزرسانی شد");
    },

    onError: (err) => {
      if (err?.name) err.name.forEach((e) => toast.error(e));
      else if (err?.logo) err.logo.forEach((e) => toast.error(e));
      else toast.error(err?.message || "خطا");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(form);
  };

  return (
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
      <div>
        <h2 className="text-lg font-bold text-gray-800">ویرایش برند</h2>
        <p className="text-xs text-gray-400">تغییر اطلاعات برند</p>
      </div>

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
          "
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500">لوگو</label>
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
          "
        />
      </div>

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
          flex
          items-center
          justify-center
          gap-2
          active:scale-95
          transition
          disabled:opacity-50
        "
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            در حال ذخیره...
          </>
        ) : (
          "ذخیره تغییرات"
        )}
      </Button>
    </form>
  );
}
