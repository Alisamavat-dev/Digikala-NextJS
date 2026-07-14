import { cookies } from "next/headers";
import CreateMediaForm from "./_components/create-media-form";
import MediaList from "./_components/medai-list";
import Header from "@/app/(panel)/_components/header";

export default async function Media() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const session = await fetch("http://localhost:4000/api/medai", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      cookie: `token=${token}`,
    },
  });

  const js = await session.json();

  return (
    <div>
      <div className="bg-[#FFFF]">
        <main className="">
          <Header />
        </main>
      </div>
      <div className="container mx-auto p-6" dir="rtl">
        <CreateMediaForm />
        <MediaList />
      </div>
    </div>
  );
}
