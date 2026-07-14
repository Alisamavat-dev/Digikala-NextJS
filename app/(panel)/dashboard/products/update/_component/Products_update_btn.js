import Button from "@/ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";

export default function Update({ id }) {
  return (
    <Link href={`/dashboard/products/update/${id}`}>
      <Button
        className="
          w-8
          h-8
          flex
          items-center
          justify-center
          rounded-full
          bg-white
          border
          border-gray-200
          text-gray-600
          hover:bg-gray-100
          hover:text-gray-800
          active:scale-95
          transition
        "
      >
        <Pencil size={16} />
      </Button>
    </Link>
  );
}
