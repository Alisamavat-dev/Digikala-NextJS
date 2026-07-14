import BrandList from "./_component/brand_list";
import CreateBrandButton from "./_component/create_brand_button";
import Header from "@/app/(panel)/_components/header";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Brand() {
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
  }
  return (
    <div>
      <Header />

      <div className="flex flex-col justify-center items-center pt-12.5 gap-2.5">
        <div className="flex justify-center ">
          <BrandList />
        </div>
        <div className="w-212.5  justify-center  ">
          <CreateBrandButton />
        </div>
      </div>
    </div>
  );
}
