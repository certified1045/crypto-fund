import { UsersColumns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { BASE_URL } from "@/lib/utils";
import AddUser from "./add-user";

export default async function Page() {
  console.log({ BASE_URL });
  const res = await fetch(`${BASE_URL}/api/user`, { cache: "no-store" });
  console.log({ res });
  const response = await res.json();
  console.log({ response });
  // const response = [];

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between">
        <h1 className="text-center text-xl">ALL USERS</h1>
        <AddUser />
      </div>
      {/* TODO: add suspense boundary */}
      <DataTable
        data={response?.data || []}
        columns={UsersColumns}
        isLoading={true}
      />
    </main>
  );
}
