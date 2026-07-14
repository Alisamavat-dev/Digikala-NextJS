"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function DeleteMediaBtn({ mediaId, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = confirm("آیا از حذف این رسانه مطمئن هستید؟");
    if (!confirmDelete) return;

    setIsDeleting(true);

    try {
      const res = await fetch(
        `http://localhost:4000/api/media/${mediaId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("خطا در حذف رسانه");
      }

      toast.success("رسانه حذف شد");
      onDelete?.();
    } catch (error) {
      toast.error(error.message || "مشکلی پیش آمده است");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      type="button"
      className="
        absolute
        top-2
        right-2
        w-8
        h-8
        flex
        items-center
        justify-center
        rounded-full
        bg-black/60
        text-white
        backdrop-blur-md
        opacity-0
        group-hover:opacity-100
        transition-all
        duration-200
        hover:bg-red-500
        active:scale-95
        disabled:opacity-40
        disabled:cursor-not-allowed
      "
    >
      {isDeleting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </button>
  );
}