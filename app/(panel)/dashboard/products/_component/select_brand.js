"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Ellipsis } from "lucide-react";
import { useState } from "react";

export default function SelectBrand({selectedBrand, setSelectedBrand}){
    
        const [open, setopen] = useState(false);
        
const {data , isPending}= useQuery({
    queryKey:["brand"],
    queryFn: async () =>{
        const response = await fetch("http://localhost:4000/api/brand");
        const media = await response.json();
        return media;
    },
});
if (isPending){
    return ( 
        <div>
            <Ellipsis/>
        </div>
    )
}
    return(
        <div className="w-full">

       <div
            className="w-full bg-white border border-gray-200 rounded-md   text-sm focus:outline-none focus:border-gray-400 cursor-pointer relative !p-[10px]"
            name="brandId"
        >
            <label className="w-full cursor-pointer text-[11px] font-bold block flex justify-between" onClick={() => setopen(!open)}>
                {selectedBrand || <p className="text-[#d1d1d1]">برند</p>}
                <ChevronDown size={10}    className={`transition-transform duration-500 ${open ? "rotate-180" : ""} mt-[4px]`} />
            </label>
            
           <div className={`rounded-[6px] bg-[#efefef] border-0 !shadow- border-[#EF4056] p-[10px] w-full absolute overflow-hidden flex-col flex bottom-[42px] right-0 transition-all duration-500 ease-in-out z-10
                ${open ? "max-h-60 opacity-100 visible p-2" : "max-h-0 opacity-0 invisible p-0"}
            `}>
                {data.map((brand) => (
                    <label 
                        key={brand._id} 
                        className="flex items-center text-[11px] font-bold gap-2 p-2 hover:bg-[#EF4056] cursor-pointer text-black rounded-md"
                        onClick={() => {
                            setSelectedBrand(brand.name);
                            setopen(false); 
                        }}
                    >
                        <input 
                            type="radio" 
                            name="brandId" 
                            id={brand._id} 
                            value={brand._id}
                            className="w-[15px] h-[15px] "
                           
                        
                         placeholder=" "
                         autoComplete="off"
                        />
                        {brand.name}
                    </label>
                ))}
            </div>
            
        </div>

             <p className=" px-[3px] mt-[5px] text-[#a4a4a4] text-[8px] "> 
                نام برند محصول خود را انتخاب کنید
                             </p>
        </div>
    )
}