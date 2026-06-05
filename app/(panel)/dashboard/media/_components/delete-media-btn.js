"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";

export default function DeleteMediaBtn({ mediaId, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const res = await fetch(`http://localhost:4000/api/media/${mediaId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        onDelete?.();
      } else {
        alert("خطا در حذف رسانه");
      }
    } catch (error) {
      alert("مشکلی پیش آمده است");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      type="button"
      className="absolute top-2 right-2 p-2 bg-[#ED1944] text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 disabled:opacity-50"
    >
      {isDeleting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </button>
  );
}
