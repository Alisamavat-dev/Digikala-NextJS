"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

export default function SignOutBtn() {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationKey: ["sign-out"],
    mutationFn: async () => {
      const response = await fetch("http://localhost:4000/api/auth/sign-out", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Sign out failed");
      }

      return response.json();
    },
    onSuccess: (data) => {
      if (data?.success) {
        router.push("/sign-in");
      }
    },
    onError: (error) => {
      console.error("Sign out error:", error);
    },
  });

  if (isPending) {
    return (
      <button
        disabled
        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 inline-flex items-center gap-2"
      >
        درحال خروج...
      </button>
    );
  }

  return (
    <button
      onClick={() => mutate()}
      className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
    >
      خروج
    </button>
  );
}
