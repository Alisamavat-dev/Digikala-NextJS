"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignUpForm() {
  const router = useRouter();

  const mutation = useMutation({
    mutationKey: ["sign-up"],
    mutationFn: async (formData) => {
      const response = await fetch("http://localhost:4000/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("fullName"),
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });

      const js = await response.json();

      if (!response.ok) {
        throw new Error(js.message || "خطا در ثبت‌نام");
      }
      return js;
    },
  });

  const handleSubmit = (formData) => {
    mutation.mutate(formData);
  };

  useEffect(() => {
    if (mutation.data?.success) {
      router.push("/sign-in");
    }
  }, [mutation.data, router]);

  console.log(mutation.data);

  if (mutation.isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <button
          disabled
          className="w-96 bg-red-500 text-white p-3 rounded-lg cursor-not-allowed"
        >
          در حال ثبت‌نام...
        </button>
      </div>
    );
  }

  if (mutation.isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
          <div className="text-center">
            <p className="text-red-500 mb-4">
              {mutation.error?.message || "خطا در ثبت‌نام"}
            </p>
            <button
              onClick={() => mutation.reset()}
              className="bg-[#EF4056] text-white p-3 rounded-lg hover:bg-[#c73548] transition"
            >
              تلاش مجدد
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-200">
        <div className="justify-center flex pb-12">
          <img
            src="https://www.digikala.com/brand/full-horizontal.svg"
            className="w-40 hover:scale-105 transition-transform duration-300 cursor-pointer"
            alt="دیجی‌کالا"
          />
        </div>

        <div className="mb-4">
          <h2 className="text-md font-bold">ثبت‌نام در دیجی‌کالا</h2>
          <p className="text-gray-500 text-sm mt-2">
            لطفا اطلاعات خود را وارد کنید
          </p>
        </div>

        <form action={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <input
              type="text"
              name="fullName"
              id="fullName"
              className="border text-gray-700 border-gray-300 rounded-lg p-3 pt-3 w-full focus:outline-none focus:ring-2 focus:ring-[#EF4056] focus:border-transparent transition hover:border-[#EF4056] duration-200"
              required
              placeholder=" "
            />
            <label
              htmlFor="fullName"
              className="absolute right-3 top-3 text-gray-500 text-sm transition-all pointer-events-none"
            >
              نام و نام خانوادگی
            </label>
          </div>

          <div className="relative">
            <input
              type="text"
              name="email"
              id="email"
              className="border text-gray-700 border-gray-300 rounded-lg p-3 pt-3 w-full focus:outline-none focus:ring-2 focus:ring-[#EF4056] focus:border-transparent transition hover:border-[#EF4056] duration-200"
              required
              dir="ltr"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="absolute right-3 top-3 text-gray-500 text-sm transition-all pointer-events-none"
            >
              ایمیل
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              id="password"
              className="border text-gray-700 border-gray-300 rounded-lg p-3 pt-3 w-full focus:outline-none focus:ring-2 focus:ring-[#EF4056] focus:border-transparent transition hover:border-[#EF4056] duration-200"
              required
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="absolute right-3 top-3 text-gray-500 text-sm transition-all pointer-events-none"
            >
              رمز عبور
            </label>
          </div>

          <button
            type="submit"
            className="bg-[#EF4056] text-white p-3 rounded-lg hover:bg-[#c73548] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 font-semibold text-md shadow-md hover:shadow-lg"
          >
            ثبت‌نام در دیجی‌کالا
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-6 hover:text-gray-600 transition-colors duration-200">
          ثبت‌نام شما به معنای پذیرش شرایط دیجی‌کالا و قوانین حریم خصوصی است
        </p>
      </div>
    </div>
  );
}
