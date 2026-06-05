

"use client";

import Button from "@/ui/button";
import { useQuery } from "@tanstack/react-query";
import { CheckCheck, Ellipsis, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function SelectMedia({selectedMedia , setSelectedMedia}){
 
  
  const [open, setOpen] = useState(false);
  const {data  , isPending}=useQuery({
    queryKey:["media"], 
    queryFn:async () => {
      const response = await fetch("http://localhost:4000/api/media");
      const media = await response.json();
      return media ; 
    },
  });
  const toggleSelect = (id) =>{
    setSelectedMedia((prev)=>{
      const next = new Set(prev);
      next.has(id)? next.delete(id):next.add(id);
      return next; 
    });
  };
  const selectedImages = data?.filter(media => selectedMedia.has(media._id)) || [];
  
  if(isPending){
    return <Ellipsis/>;
  }

  return (
    <div className=" w-full h-full flex flex-col   ">

      <input 
        type="hidden" 
        name="media" 
        value={Array.from(selectedMedia).join(",")} 
      />
    <div  className="text-[11px] w-full  h-full text-[#a9a8a8] m-[0_auto] flex justify-center">
          { selectedMedia.size ==0? <p className="mt-[50px]">
            عکسی انتخاب نشده است
          </p>:  
         <div className="flex w-full h-full gap-[20px] flex-wrap  p-[20px_10px]  items-start  justify-center  overflow-auto scrollbar-right">
          { selectedImages.map((img)=>{
            return(
               <Image
                      src={img.url}
                      key={img._id}
                      alt={img._id}
                      width={70}
                      height={70}
                      className={`object-contain   `}
                    />

            )
          })}
         </div>
         }
    </div>
      <Button
      
            type={"button"}
        click={() => setOpen(true)}
        className=" shadow text-white rounde-[10px] text-[10px] w-fit m-[15px_auto] px-[30px] hover:scale-105 transition-all duration-150 absolute bottom-[0px] left-1/2 -translate-x-1/2  "
      >
        انتخاب  
      </Button>
      


      <div
        className={`fixed top-0  left-0 w-screen h-screen ${
          open ? "flex" : "hidden"
        } flex-col gap-2  justify-center items-center p-2 bg-black/50 z-50`}
        onClick={() => setOpen(false)}
      >

        <div
          className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >

          <div className="sticky top-0 bg-white border-b-1 mb-[20px] p-4 border-[#00000014] flex justify-between items-center">
            <h2 className="text-[16px] font-bold">انتخاب عکس</h2>
            <Button
            type={"button"}
              click={() => setOpen(false)}
              className="w-fit h-fit p-[5px]  text-white rounded"
            >
              <X size={10}/>
            </Button>
          </div>


          {isPending ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="w-full h-fit overflow-auto scrollbar-right  flex flex-wrap justify-center gap-[25px] p-4  rounded max-h-[250px]">
              {data.map((media) => {
                const isSelected = selectedMedia.has(media._id);
                return (
                  <button
                    key={media._id}
                    type="button"
                    onClick={() => toggleSelect(media._id)}
                    className="relative cursor-pointer"
                  >
                    <Image
                      src={media.url}
                      alt={media._id}
                      width={130}
                      height={130}
                      className={`object-cover rounded transition-all shadow-sm rounded-[10px] duration-300 mb-[20px] ${
                        isSelected ? " border-[#c6c6c6] blur-[1px] brightness-75 " : "border border-gray-200"
                      }`}
                    />
                    {isSelected && (
                      <div className="absolute top-[56px] right-[54px] bg-white rounded-full w-fit h-fit p-[5px] flex text-[#dc2840] ">
                       <CheckCheck size={14} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

