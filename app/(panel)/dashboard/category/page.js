import CategoryList from "./_component/category_list";
import CreateCategoryButton from "./_component/create_category_button";
import Header from "@/app/(panel)/_components/header";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Category() {
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
    <div>
      <Header />
      <div className="flex flex-col justify-center items-center pt-12.5 gap-2.5">
        <div className="w-212.5  justify-center  ">
          <CreateCategoryButton />
        </div>

        <div className="flex justify-center ">
          <CategoryList />
        </div>
      </div>
    </div>
  );
}
