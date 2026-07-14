"use client";

import Button from "@/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

const createCategorySchema = z.object({
  name: z
    .string()
    .min(3, "نام دسته‌بندی حداقل 3 حرف است")
    .max(10, "حداکثر 10 حرف")
    .regex(/^[آ-ی\s]+$/, "فقط فارسی"),

  en_name: z
    .string()
    .min(3, "حداقل 3 حرف")
    .max(10, "حداکثر 10 حرف")
    .regex(/^[a-zA-Z\s]+$/, "فقط انگلیسی"),

  image: z.string().url("آدرس تصویر معتبر نیست"),
});

export default function CreateCategory({ onClose }) {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    name: "",
    en_name: "",
    image: "",
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-category"],

    mutationFn: async (data) => {
      const result = createCategorySchema.safeParse(data);

      if (!result.success) {
        throw result.error.flatten().fieldErrors;
      }

      const res = await fetch("http://localhost:4000/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("خطا در ساخت دسته‌بندی");
      }

      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      toast.success("دسته‌بندی ساخته شد");
      setForm({ name: "", en_name: "", image: "" });
      if (onClose) onClose();
    },

    onError: (err) => {
      if (err?.name) err.name.forEach((e) => toast.error(e));
      else if (err?.en_name) err.en_name.forEach((e) => toast.error(e));
      else if (err?.image) err.image.forEach((e) => toast.error(e));
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
        w-full max-w-md
        bg-white
        rounded-2xl
        p-6
        flex flex-col gap-4
      "
    >
      <div>
        <h2 className="text-lg font-bold text-gray-800">ساخت دسته‌بندی</h2>
        <p className="text-xs text-gray-400">اطلاعات را وارد کنید</p>
      </div>

      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="نام دسته‌بندی"
        className="w-full h-11 px-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
      />

      <input
        value={form.en_name}
        onChange={(e) => setForm({ ...form, en_name: e.target.value })}
        placeholder="نام لاتین"
        className="w-full h-11 px-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
      />

      <input
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
        placeholder="آدرس تصویر"
        className="w-full h-11 px-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
      />

      <Button
        disabled={isPending}
        className="
          w-full h-11
          rounded-xl
          bg-linear-to-r from-[#B31A39] to-[#C10517]
          text-white
          active:scale-95
          transition
        "
      >
        {isPending ? "در حال ساخت..." : "ساخت دسته‌بندی"}
      </Button>
    </form>
  );
}
