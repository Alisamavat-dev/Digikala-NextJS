"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignInForm() {
  const router = useRouter();

  const mutation = useMutation({
    mutationKey: ["sign-in"],
    mutationFn: async (formData) => {
      const response = await fetch("http://localhost:4000/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          password: formData.get("password"),
          email: formData.get("email"),
        }),
      });
      const js = await response.json();

      if (!response.ok) {
        throw new Error(js.message || "ایمیل یا رمز عبور اشتباه است");
      }

      return js;
    },
  });

  const handleSubmit = (formData) => {
    mutation.mutate(formData);
  };

  useEffect(() => {
    if (mutation.data?.success) {
      router.push("/dashboard");
    }
  }, [mutation.data, router]);

  if (mutation.isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <button
          disabled
          className="w-96 bg-red-500 text-white p-3 rounded-lg cursor-not-allowed"
        >
          در حال ورود...
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-200">
        <div className="justify-center flex pb-12">
          <img
            src="https://www.digikala.com/brand/full-horizontal.svg"
            className="w-40 hover:scale-105 transition-transform duration-300 cursor-pointer"
            alt="دیجی‌کالا"
          />
        </div>

        <div className="mb-4">
          <h2 className="text-md font-bold">ورود در دیجی‌کالا</h2>
          <p className="text-gray-500 text-sm mt-2">
            لطفا ایمیل و رمز عبور خود را وارد کنید
          </p>
        </div>

        <form action={handleSubmit} className="flex flex-col gap-4">
          <div className="relative ">
            <input
              type="text"
              name="email"
              id="email"
              className="border text-gray-700 border-gray-300 rounded-lg p-2 pt-3 w-full focus:outline-none focus:ring-2 focus:border-transparent transition hover:border-[#000000] duration-200"
              required
              dir="ltr"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="absolute right-3 top-3 text-gray-500 text-sm transition-all pointer-events-none"
            >
              ایمیل خود را وارد کنید
            </label>
          </div>

          <div className="relative">
            <input
              dir="ltr"
              type="password"
              name="password"
              id="password"
              className="border text-gray-700 border-gray-300 rounded-lg p-2 pt-3 w-full focus:outline-none focus:ring-2 focus:border-transparent transition hover:border-[#000000] duration-200"
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

          {mutation.isError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
              <p className="text-red-600 text-sm">
                {mutation.error?.message || "ایمیل یا رمز عبور اشتباه است"}
              </p>
            </div>
          )}

          <button
            type="submit"
            className="bg-[#EF4056] text-white p-3 rounded-lg hover:bg-[#c73548] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 font-semibold text-md shadow-md hover:shadow-lg"
          >
            ورود به دیجی‌کالا
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            اکانت ندارید؟{" "}
            <button
              type="button"
              onClick={() => router.push("/sign-up")}
              className="text-[#EF4056] hover:underline font-medium"
            >
              اکانت بسازید
            </button>
          </p>
        </div>
        <p className="text-xs text-gray-400 text-center mt-6 hover:text-gray-600 transition-colors duration-200">
          ورود شما به معنای پذیرش شرایط دیجی‌کالا و قوانین حریم خصوصی است
        </p>
      </div>
    </div>
  );
}
