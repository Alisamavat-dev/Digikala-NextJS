
import Link from "next/link";
import CreateProduct from "./_component/create_product";
import Button from "@/ui/button";
import { ChevronLeft, Plus } from "lucide-react";

export default function Create (){

    return (
        <>
       

         <div className="flex flex-col justify-center items-center pt-[50px] gap-[10px]">
                    
                   <div className="w-[850px]  justify-center  ">
                   
                       <Link href={"../products"}>
                    
                    <Button
                            className={"w-fit h-fit p-[7px] fixed top-[20px] left-[20px] rounded-[6px] rounded-full  bg-gradient-to-br from-[#B31A39]  to-[#C10517] "}
                          >
                            <ChevronLeft size={15} />
                          </Button>
                    </Link>
                    
                
                   </div>
                    
                    <div className="flex justify-center ">
                        <CreateProduct/>
                    </div>
                   
                   
                </div>
        </>
    )
}