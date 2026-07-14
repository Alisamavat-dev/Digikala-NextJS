import Button from "@/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import ProductList from "./_component/product_list";

import Header from "@/app/(panel)/_components/header";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Products() {
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
  }  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center pt-12.5 gap-2.5">
        <div className="w-212.5  justify-center  ">
          <Link href={"/dashboard/products/create"}>
            <Button
              className="
             w-fit h-fit p-1.75 fixed bottom-5 right-5 rounded-full 
             bg-linear-to-r from-red-500 to-pink-500 
             hover:shadow-lg hover:shadow-red-500/25
             active:scale-95
             transition-all duration-200
            text-white
             border-0"
            >
              <Plus size={29} />
            </Button>
          </Link>
        </div>

        <div className="flex justify-center ">
          <ProductList />
        </div>
      </div>
    </>
  );
}
