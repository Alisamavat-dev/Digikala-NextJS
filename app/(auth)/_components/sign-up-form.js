"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

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
        credentials: "include",
        body: JSON.stringify({
          name: formData.get("fullName"),
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });

      const js = await response.json();

      if (!response.ok) {
        const errorMessage = js.message || js.error || "خطا در ثبت‌نام";
        throw new Error(errorMessage);
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

  if (mutation.isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button
          disabled
          className="w-96 bg-red-500 text-white p-3 rounded-lg cursor-not-allowed"
        >
          در حال ثبت‌نام...
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-200">
        <div className="justify-center flex pb-12">
          {/* ✅ تبدیل img به Image */}
          <Image
            src="https://www.digikala.com/brand/full-horizontal.svg"
            width={160}
            height={50}
            className="hover:scale-105 transition-transform duration-300 cursor-pointer"
            alt="دیجی‌کالا"
            priority
          />
        </div>

        <div className="mb-4">
          <h2 className="text-md font-bold">ثبت‌نام در دیجی‌کالا</h2>
          <p className="text-gray-500 text-sm mt-2">
            لطفا اطلاعات خود را وارد کنید
          </p>
        </div>

        {mutation.isError && (
          <div className="border border-red-200 rounded-lg p-3 mb-4 text-center">
            <p className="text-red-600 text-sm">
              {mutation.error?.message ||
                "خطا در ثبت‌نام. لطفاً دوباره تلاش کنید."}
            </p>
          </div>
        )}

        <form action={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <input
              dir="rtl"
              type="text"
              name="fullName"
              id="fullName"
              className="border text-gray-700 border-gray-300 rounded-lg p-2 pt-3 w-full focus:outline-none focus:ring-2 focus:ring-[#EF4056] focus:border-transparent transition hover:border-[#EF4056] duration-200 peer"
              required
              placeholder=" "
            />
            <label
              htmlFor="fullName"
              className="absolute right-3 top-3 text-gray-500 text-sm transition-all pointer-events-none peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#EF4056] peer-focus:font-medium"
            >
              نام و نام خانوادگی
            </label>
          </div>

          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              className="border text-gray-700 border-gray-300 rounded-lg p-2 pt-3 w-full focus:outline-none focus:ring-2 focus:ring-[#EF4056] focus:border-transparent transition hover:border-[#EF4056] duration-200 peer"
              required
              dir="ltr"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="absolute right-3 top-3 text-gray-500 text-sm transition-all pointer-events-none peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#EF4056] peer-focus:font-medium"
            >
              ایمیل
            </label>
          </div>

          <div className="relative">
            <input
              dir="ltr"
              type="password"
              name="password"
              id="password"
              className="border text-gray-700 border-gray-300 rounded-lg p-2 pt-3 w-full focus:outline-none focus:ring-2 focus:ring-[#EF4056] focus:border-transparent transition hover:border-[#EF4056] duration-200 peer"
              required
              placeholder=" "
              minLength={6}
            />
            <label
              htmlFor="password"
              className="absolute right-3 top-3 text-gray-500 text-sm transition-all pointer-events-none peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#EF4056] peer-focus:font-medium"
            >
              رمز عبور (حداقل ۶ کاراکتر)
            </label>
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="bg-[#EF4056] text-white p-3 rounded-lg hover:bg-[#c73548] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 font-semibold text-md shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
          >
            {mutation.isPending ? "در حال ثبت‌نام..." : "ثبت‌نام در دیجی‌کالا"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            قبلاً ثبت‌نام کرده‌اید؟{" "}
            <button
              type="button"
              onClick={() => router.push("/sign-in")}
              className="text-[#EF4056] hover:underline font-medium cursor-pointer"
            >
              وارد شوید
            </button>
          </p>
        </div>

        <p className="text-xs text-gray-400 text-center mt-4 hover:text-gray-600 transition-colors duration-200">
          ثبت‌نام شما به معنای پذیرش شرایط دیجی‌کالا و قوانین حریم خصوصی است
        </p>
      </div>
    </div>
  );
}
