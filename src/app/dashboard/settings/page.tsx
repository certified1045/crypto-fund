import { BASE_URL } from "@/lib/utils";
import EditAddress from "./edit-address";

export default async function Page() {
  const res = await fetch(`${BASE_URL}/api/address`, { cache: "no-store" });
  const response = await res.json();

  console.log({ response });

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-meduim">Wallet Address</h4>
        <EditAddress address={response.value} />
      </div>
      <p>{response.value}</p>
    </main>
  );
}
