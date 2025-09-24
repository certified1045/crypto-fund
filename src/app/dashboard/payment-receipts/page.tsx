import { UsersReceipts } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { BASE_URL } from "@/lib/utils";

export default async function page() {
  const res = await fetch(`${BASE_URL}/api/payment`, { cache: "no-store" });
  const response = await res.json();
  console.log({ response });
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between">
        <h1 className="text-center text-xl">ALL USERS</h1>
      </div>
      {/* TODO: add suspense boundary */}
      <DataTable
        data={response || []}
        columns={UsersReceipts}
        isLoading={true}
      />
    </main>
  );
}
