"use client";

import Button from "@/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateCategory from "./create_category";

export default function CreateCategoryButton() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button
        click={() => setOpen(true)}
        className={
          "w-fit h-fit p-[7px] fixed bottom-[20px] right-[20px] rounded-[6px] rounded-full  bg-gradient-to-br from-[#B31A39]  to-[#C10517] "
        }
      >
        <Plus size={29} />
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
            <CreateCategory />
          </div>
        </div>
      )}
    </div>
  );
}
