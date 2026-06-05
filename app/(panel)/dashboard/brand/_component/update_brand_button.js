"use client";

import Button from "@/Ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import UpdateBrand from "./update_brand";

export default function UpdateBrandButton({ id, name, logo }) {
  
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        click={() => setOpen(true)}
        className={"w-fit h-fit p-[4px]  bg-[#ffffff] border-1 border-[#000000] hover:bg-[#dbdbdb]"}
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
            <UpdateBrand
              id={id}
              currentName={name} 
              currentLogo={logo} 
            />
          </div>
        </div>
      )}
    </div>
  );
}
