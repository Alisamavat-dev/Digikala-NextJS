import Header from "@/app/(panel)/_components/header";
import InventoryList from "../_components/inventory-list";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Dashboard() {
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
    <div className="bg-[#FFFF]">
      <main className="">
        <Header />
        <InventoryList />
      </main>
    </div>
  );
}
