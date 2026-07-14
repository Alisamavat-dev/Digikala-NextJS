"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function Accardion({ children, title, className, className02 }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`min-w-87.5 flex flex-col ${open ? "h-auto" : "h-11.25"} gap-2 p-2  border-b border-[#c0c0c05f] overflow-hidden cursor-pointer `}
    >
      <div className="flex  justify-between  " onClick={() => setOpen(!open)}>
        <h3 className="text-[13px] leading-7.5 mr-3.5">{title}</h3>
        <ChevronUp
          size={15}
          className={twMerge(
            `  ${open ? "rotate-180" : " rotate-0"} transition-transform duration-300   w-fit! px-.75! mt-1!`,
            className,
          )}
        />
      </div>
      <div
        className={twMerge(
          `transition-transform    w-fit! px-0.75! mt-1!`,
          className02,
        )}
      >
        {children}
      </div>
    </div>
  );
}
