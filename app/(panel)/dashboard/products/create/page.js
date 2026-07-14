import Link from "next/link";
import CreateProduct from "./_component/create_product";
import { ChevronLeft } from "lucide-react";
import Button from "@/ui/button";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Create() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/sign-in");
  }

  const session = await fetch("http://localhost:4000/api/auth/session", {
    headers: {
      "Content-type": "application/json",
      Cookie: `token=${token}`,
    },
    cache: "no-store",
  });

  const js = await session.json();

  if (!js.authorized) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link href={"/dashboard/products"}>
          <Button
            className="
              fixed top-6 left-6 z-50
              w-10 h-10
              flex items-center justify-center
              rounded-full
              bg-linear-to-r from-red-500 to-pink-500
              text-white
              hover:shadow-lg hover:shadow-red-500/25
              active:scale-95
              transition-all duration-200
              border-0
            "
          >
            <ChevronLeft size={20} />
          </Button>
        </Link>

        <div className="flex justify-center items-center min-h-[calc(100vh-3rem)]">
          <CreateProduct />
        </div>
      </div>
    </div>
  );
}