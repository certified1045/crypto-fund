import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BASE_URL } from "@/lib/utils";
import EditAddress from "./edit-address";
import EditDetails from "./edit-details";

export default async function Page() {
  const res = await fetch(`${BASE_URL}/api/address`, { cache: "no-store" });
  const response = await res.json();

  console.log({ response });

  const address = response?.find((v) => v.key == "address")?.value || "";
  const details = response?.find((v) => v.key == "details")?.value || "";

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-meduim">Settings</h4>
      </div>
      <Card className="p-3">
        <span className="flex justify-between items-center">
          <h3 className="text-lg">Payment Info</h3>
          <EditDetails address={details} />
        </span>
        <Separator />
        {details && <div dangerouslySetInnerHTML={{ __html: details }} />}
      </Card>
      <Card className="p-3">
        <span className="flex justify-between items-center">
          <h3 className="text-lg">Payment Address</h3>
          <EditAddress address={address} />
        </span>
        <Separator />
        {address && <p>{address}</p>}
      </Card>

      {/* <p>{response.value}</p> */}
    </main>
  );
}
