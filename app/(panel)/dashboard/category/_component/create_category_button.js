"use client";

import Button from "@/ui/button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import CreateCategory from "./create_category";

export default function CreateCategoryButton() {
  const [open, setOpen] = useState(false);

  // ESC + scroll lock
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleEsc);

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <>
      <Button
        click={() => setOpen(true)}
        className="
          fixed bottom-6 right-6
          w-14 h-14
          rounded-full
          bg-linear-to-br           from-red-600
          to-pink-600
          text-white
          shadow-xl
          hover:scale-105
          active:scale-95
          transition
          flex items-center justify-center
          z-40
        "
      >
        <Plus size={26} />
      </Button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
            fixed inset-0
            z-50
            bg-black/50
            backdrop-blur-sm
            flex items-center justify-center
            p-4
            animate-fadeIn
          "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              w-full max-w-md
              bg-white
              rounded-2xl
              shadow-2xl
              p-5
              relative
              animate-scaleIn
            "
          >
            <button
              onClick={() => setOpen(false)}
              className="
                absolute top-3 right-3
                w-8 h-8
                rounded-full
                bg-gray-100
                hover:bg-gray-200
                flex items-center justify-center
                transition
              "
            >
              ✕
            </button>

            <CreateCategory onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
