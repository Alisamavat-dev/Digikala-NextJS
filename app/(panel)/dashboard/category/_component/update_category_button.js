"use client";

import Button from "@/ui/button";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import UpdateCategory from "./update_category";

export default function UpdateCategoryButton({ id, name, image, en_name }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      <Button
        click={() => setOpen(true)}
        className="
          w-8
          h-8
          flex
          items-center
          justify-center
          rounded-full
          bg-white
          border
          border-gray-300
          hover:bg-gray-100
          active:scale-95
          transition
        "
      >
        <Pencil size={15} color="#000000" />
      </Button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
            fixed
            inset-0
            bg-black/50
            flex
            items-center
            justify-center
            z-50
          "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              bg-white
              rounded-2xl
              shadow-2xl
              p-4
            "
          >
            <UpdateCategory
              id={id}
              currentEn_Name={en_name}
              currentName={name}
              currentImage={image}
            />
          </div>
        </div>
      )}
    </>
  );
}
