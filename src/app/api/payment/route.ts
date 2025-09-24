// app/api/settings/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { payments, settings } from "@/db/schema/schema";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const { userId, imgURL } = await req.json();
    const v = await db.insert(payments).values({
      userId,
      imgURL,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.log({ err });
    return new NextResponse(
      JSON.stringify({
        error: "Something went wrong",
      }),
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const allPayments = await db.query.payments.findMany({
      columns: { createdAt: true, imgURL: true },
      with: { user: { columns: { username: true } } },
    });
    if (!allPayments) {
      return new NextResponse(
        JSON.stringify({
          error: "No payments yet",
        }),
        { status: 404 }
      );
    }
    return NextResponse.json(allPayments);
  } catch (err) {
    console.log({ err });
    return new NextResponse(
      JSON.stringify({
        error: "Something went wrong",
      }),
      { status: 500 }
    );
  }
}
