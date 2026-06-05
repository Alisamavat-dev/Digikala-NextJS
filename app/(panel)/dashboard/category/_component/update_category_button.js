"use client";

import Button from "@/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import UpdateCategory from "./update_category";

export default function UpdateCategoryButton({ id, name, image, en_name }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        click={() => setOpen(true)}
        className={
          "w-fit h-fit p-[4px]  bg-[#ffffff] border-1 border-[#000000] hover:bg-[#dbdbdb]"
        }
      >
        <Pencil size={15} color="#000000" />
      </Button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#fff] p-[1px_8px_0px_3px] rounded-[10px]"
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
    </div>
  );
}
