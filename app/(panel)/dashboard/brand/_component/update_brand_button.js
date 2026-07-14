"use client";

import Button from "@/ui/button";
import { Pencil, X } from "lucide-react";
import { useEffect, useState } from "react";
import UpdateBrand from "./update_brand";

export default function UpdateBrandButton({ id, name, logo }) {
  const [open, setOpen] = useState(false);

  // ESC to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      {/* EDIT BUTTON */}
      <Button
        click={() => setOpen(true)}
        className="
          w-8
          h-8
          flex
          items-center
          justify-center
          rounded-full
          border
          border-gray-200
          bg-white
          hover:bg-gray-100
          transition
          active:scale-95
        "
      >
        <Pencil size={14} color="#000" />
      </Button>

      {/* MODAL */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
            fixed
            inset-0
            z-50
            bg-black/50
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-4
            animate-fadeIn
          "
        >
          {/* MODAL BOX */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              w-full
              max-w-md
              bg-white
              rounded-2xl
              shadow-2xl
              p-5
              relative
              animate-scaleIn
            "
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setOpen(false)}
              className="
                absolute
                top-3
                right-3
                w-8
                h-8
                rounded-full
                bg-gray-100
                hover:bg-gray-200
                flex
                items-center
                justify-center
                transition
              "
            >
              <X className="w-4 h-4" />
            </button>

            <UpdateBrand
              id={id}
              currentName={name}
              currentLogo={logo}
            />
          </div>
        </div>
      )}
    </>
  );
}