"use client";

import Image from "next/image";
import { twMerge } from "tailwind-merge";

export default function Card({
  image,
  title,
  className,
  imgClassName,
  titleClassName,
  children,
  alt,
}) {
  return (
    <div
      className={twMerge(
        "flex p-[10px-20px] justify-center gap-2.5 rounded-sm shadow",
        className,
      )}
    >
      <div className={`p-2 ${imgClassName}`}>
        <Image
          src={image || pLaceHolder}
          alt={alt || title || "تصویر"}
          width={250}
          height={250}
          className="h-auto"
        />
      </div>
      <div className=" w-full flex ">
        <h2
          className={twMerge("text-sm line-clamp-2 leading-2", titleClassName)}
        >
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}
