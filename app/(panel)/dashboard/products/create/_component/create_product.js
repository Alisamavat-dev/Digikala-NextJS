"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SelectCategory from "../../_component/select_category";
import SelectBrand from "../../_component/select_brand";
import Button from "@/Ui/button";
import SelectMedia from "../../_component/select_media";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

const productSchema = z.object({
        name: z.string()
            .min(3, "نام محصول باید حداقل ۳ حرف باشد"),
        price: z.string()
            .min(1, "قیمت محصول نمی‌تواند خالی باشد")
            .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
                message: "قیمت باید یک عدد معتبر و مثبت باشد"
            }),
        sale: z.string()
            .min(1, "درصد تخفیف نمی‌تواند خالی باشد")
            .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
                message: "درصد تخفیف باید عددی برابر یا بیشتر از ۰ باشد"
            }),
        media: z.string()
            .min(1, "حداقل یک عکس باید انتخاب شود")
            .refine((val) => val.split(",").filter(id => id.trim()).length > 0, {
                message: "حداقل یک عکس باید انتخاب شود"
            }),
        category: z.string()
            .min(1, "لطفاً یک دسته‌بندی انتخاب کنید"),
        brand: z.string()
            .min(1, "لطفاً یک برند انتخاب کنید"),
    });

export default function CreateProduct (){
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedMedia, setSelectedMedia] = useState(new Set());
    const router = useRouter();
    const queryClient= useQueryClient();
    const {mutate , isPending}=useMutation({
        mutationKey:["create_product"], 
        mutationFn: async (formData)=>{
            

      const formValues = {
                name: formData.get("title")?.trim() || "",
                price: formData.get("price")?.trim() || "",
                sale: formData.get("sale")?.trim() || "",
                media: formData.get("media")?.trim() || "",
                category: formData.get("categoryId") || "",
                brand: formData.get("brandId") || "",
            };
             const validationResult = productSchema.safeParse(formValues);

                 if (!validationResult.success) {
        const flattened = validationResult.error.flatten();
        const allErrors = [
          ...(flattened.fieldErrors.name || []),
          ...(flattened.fieldErrors.price || []),
          ...(flattened.fieldErrors.sale || []),
          ...(flattened.fieldErrors.media || []),
          ...(flattened.fieldErrors.category || []),
          ...(flattened.fieldErrors.brand || []),
        ];

        throw allErrors;
      }
      const media = formData.get("media").split(",").map((id)=>id);

            const response = await fetch("http://localhost:4000/api/product",{
                method: "POST",
                headers : { 
                    "Content-type": "application/json",
                },
                credentials:"include",
                body:JSON.stringify({
                    name: formData.get("title"),
                    price: Number(formData.get("price")),
                    sale: Number(formData.get("sale")),
                    media,
                    category: formData.get("categoryId"),
                    brand: formData.get("brandId"),
                }),
            });
            const js = await response.json();
            return js;
        },
        onSuccess: () =>{
          setSelectedBrand("");
          setSelectedCategory("");

          setSelectedMedia(new Set());
            queryClient.invalidateQueries({queryKey: ["product"]});
            router.push("/dashboard/products");
      toast.success(" محصول با موفقیت ثبت شد");
        },
        onError: (error) => {
          setSelectedBrand("");
          setSelectedCategory("");

          setSelectedMedia(new Set());
      if (Array.isArray(error)) {
        error.forEach((err) => {
          toast.error(err);
        });
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("خطایی رخ داده است");
      }
    },
    });
    
    return(
        <>
      <Toaster position="top-left" />
     
            <form action={mutate}
 className="max-w-md mx-auto p-6  rounded-2xl shadow-sm bg-[#f6f2f2] h-fit my-[30px]">
                      <div className="mb-6  border-b pb-4">
                    <h1 className="text-[21px] font-bold text-[#202020] ">ساخت محصول</h1>
                    <p className=" text-[#a4a4a4] text-[10px] mt-1">یک محصول جدید به فروشگاه خود اضافه کنید</p>
                </div>




                   <div className="  flex flex-col gap-1.5 h-fit  w-full   bg-white rounded-[9px] !p-[20px_10px]  ">
                    <div className=" flex flex-col gap-[13px]">
                       <div className="fl-field fl-field p-[2px]  w-full">
                       <input
                         className="fl-input w-full h-[40px] rounded-lg"
                         type="text"
                         name="title"
                         placeholder=" "
                         autoComplete="off"
                       />
                       <label className="fl-label right-[20px] !text-[11px] top-[10px]">
                         نام محصول
                       </label>
                       <p className=" px-[3px] text-[#a4a4a4] text-[8px] mt-1"> یک نام کوتاه برای محصول خود انتخاب کنید </p>
                     </div>
                     <div className="fl-field p-[2px] w-full">
                       <input
                         className="fl-input w-full h-[40px] rounded-lg"
                         type="text"
                         name="price"
                         placeholder=" "
                         autoComplete="off"
                       />
                       <label className="fl-label right-[20px] top-[13px] ">
                         قیمت محصول                       </label>
                             <p className=" px-[3px] text-[#a4a4a4] text-[8px] mt-1"> 
                              قیمت محصول خود را  به تومان بنویسید
                             </p>
                     </div>
                     <div className="fl-field p-[2px] w-full">
                       <input
                         className="fl-input w-full h-[40px] rounded-lg"
                         type="text"
                         name="sale"
                         placeholder=" "
                         autoComplete="off"
                       />
                       <label className="fl-label right-[20px] top-[13px] ">
                         درصد تخفیف                       </label>
                         
                         <p className=" px-[3px] text-[#a4a4a4] text-[8px] mt-1"> 
                          درصد تخفیف محصول خود را  بنویسید و درصورت نداشتن تخفیف مقدار آن را 0 بزارید
                             </p>
                     </div>
                    </div>
                     <div className="fl-field p-[2px] border-[1.5px] border-dashed border-[#e5e5e5] rounded-[10px] h-[150px] mt-[15px]">
                          <SelectMedia selectedMedia={selectedMedia}
setSelectedMedia={setSelectedMedia}/>
                        
                    </div>
                      <p className=" px-[3px] text-[#a4a4a4] text-[8px] "> 
                            عکس یا عکس های مناسبی برای محصول خود انتخاب کنید
                             </p>

                    <div className="fl-field p-[2px] mt-[15px] w-full flex gap-[40px]">
                          <SelectCategory selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
                          <SelectBrand selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand}/>
                    </div>

                   
                     <Button
                       disabled={isPending}
                       className={
                         "bg-[#EF4056] text-white text-[15px]  cursor-pointer w-full h-[40px] rounded-[8px] mt-[15px]  "
                       }
                     >
                       ساخت
                     </Button>
                   </div>
                 </form>
        </>
    )

}
