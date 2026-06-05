"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Ellipsis } from "lucide-react";
import { useState } from "react";

export default function SelectCategory({selectedCategory, setSelectedCategory}) {
    const [open, setopen] = useState(false);
    

    const { data, isPending } = useQuery({
        queryKey: ["category"],
        queryFn: async () => {
            const response = await fetch("http://localhost:4000/api/category");
            const media = await response.json();
            return media;
        },
    });

    if (isPending) {
        return (
            <div>
                <Ellipsis />
            </div>
        );
    }

    return (
        <div className=" w-full">

        <div
            className="w-full bg-white border border-gray-200 rounded-md   text-sm focus:outline-none focus:border-gray-400 cursor-pointer relative  !p-[10px]"
            name="categoryId"
        >
            <label className="w-full text-[11px] font-bold cursor-pointer flex justify-between block" onClick={() => setopen(!open)}>
                {selectedCategory || <p className="text-[#d1d1d1]">دسته بندی</p>} 
                <ChevronDown size={10}    className={`transition-transform duration-500 ${open ? "rotate-180" : ""} mt-[4px]`} />
            </label>
            
            <div className={`rounded-[6px] bg-[#efefef] border-0 !shadow- border-[#EF4056] p-[10px] w-full absolute overflow-hidden flex-col flex bottom-[42px] right-0 transition-all duration-500 ease-in-out z-10
                ${open ? "max-h-60 opacity-100 visible p-2" : "max-h-0 opacity-0 invisible p-0"}
            `}>
                {data.map((category) => (
                    
                    <label 
                        key={category._id} 
                        className="flex items-center text-[11px] font-bold gap-2 p-2 hover:bg-[#EF4056] cursor-pointer text-black rounded-md"
                        onClick={() => {
                            setSelectedCategory(category.name);
                            setopen(false); 
                        }}
                    >
                        <input 
                            type="radio" 
                            name="categoryId" 
                            id={category._id} 
                            value={category._id}
                            className="w-[15px] h-[15px] "
                            
                        />
                        {category.name}
                    </label>
                ))}
            </div>

        </div>
         <p className=" px-[3px] mt-[5px] text-[#a4a4a4] text-[8px] "> 
                نام دسته بندی محصول خود را انتخاب کنید
                             </p>
        </div>
    );
}