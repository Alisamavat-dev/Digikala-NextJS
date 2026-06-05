"use client";
import { Ellipsis } from "lucide-react";
import { twMerge } from "tailwind-merge";

export default function Button({ click, disabled, className, children, type }) {
  return (
    <button
      type={type}
      onClick={click}
      disabled={disabled}
      className={twMerge(
        "p-2 w-[60px] text-white bg-[#EF4056] hover:bg-[#cb3347] cursor-pointer rounded-sm flex justify-center",
        className
      )}
    >
      {disabled ? <Ellipsis /> : children}
    </button>
  );
}