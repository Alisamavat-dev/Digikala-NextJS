import CategoryList from "./_component/category_list";
import CreateCategoryButton from "./_component/create_category";

export default function Category() {
  return (
    <div className="flex flex-col justify-center items-center pt-[50px] gap-[10px]">
      <div className="w-[850px]  justify-center  ">
        <CreateCategoryButton />
      </div>

      <div className="flex justify-center ">
        <CategoryList/>
      </div>
    </div>
  );
}
