import BrandList from "./_component/brand_list";
import CreateBrand from "./_component/create_brand";
import CreateBrandButton from "./_component/create_brand_button";

export default function Brand() {
  return (
    <div className="flex flex-col justify-center items-center pt-[50px] gap-[10px]">
      

      <div className="flex justify-center ">
        <BrandList />
      </div>
      <div className="w-[850px]  justify-center  ">
        <CreateBrandButton />
      </div>
    </div>
  );
}
