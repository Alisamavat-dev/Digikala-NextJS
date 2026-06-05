import Header from "@/app/(panel)/_components/header";
import InventoryList from "../_components/inventory-list";

export default function sign_in() {
  return (
    <div className="bg-[#FFFF]">
      <main className="">
        <Header />
        <InventoryList />
      </main>
    </div>
  );
}
