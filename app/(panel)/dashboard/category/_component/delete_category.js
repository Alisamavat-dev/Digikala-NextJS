"use client";

import Button from "@/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function DeleteCategory({ id }) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["delete-category", id],

    mutationFn: async () => {
      const response = await fetch(`http://localhost:4000/api/category/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("خطا در حذف دسته بندی");
      }

      return response.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      toast.success("دسته بندی با موفقیت حذف شد");
    },

    onError: (error) => {
      toast.error(error?.message || "خطا در حذف دسته بندی");
    },
  });

  const handleDelete = () => {
    const ok = confirm("آیا از حذف این دسته بندی مطمئن هستید؟");
    if (!ok) return;

    mutate();
  };

  return (
    <Button
      disabled={isPending}
      click={handleDelete}
      className="
        w-8
        h-8
        flex
        items-center
        justify-center
        rounded-full
        bg-red-500
        text-white
        hover:bg-red-600
        active:scale-95
        transition
        disabled:opacity-50
        disabled:cursor-not-allowed
      "
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <X size={16} />
      )}
    </Button>
  );
}
