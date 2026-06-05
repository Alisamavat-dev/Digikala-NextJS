import Button from "@/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import ProductList from "./_component/product_list";
import Header from "@/app/(panel)/_components/header";

export default function Products() {
  return (
    <>
      <div>
        <Header />
        <div className="flex flex-col justify-center items-center pt-[50px] gap-[10px]">
          <div className="w-[850px]  justify-center  ">
            <Link href={"/dashboard/products/create"}>
              <Button
                className={
                  "w-fit h-fit p-[7px] fixed bottom-[20px] right-[20px] rounded-[6px] rounded-full  bg-gradient-to-br from-[#B31A39]  to-[#C10517] "
                }
              >
                <Plus size={29} />
              </Button>
            </Link>
          </div>

          <div className="flex justify-center ">
            <ProductList />
          </div>
        </div>
      </div>
    </>
  );
}
