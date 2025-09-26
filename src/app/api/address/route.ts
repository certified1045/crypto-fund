// app/api/settings/route.ts
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/db";
import { settings } from "@/db/schema/schema";
import { addAddressSchema } from "@/lib/zodSchema";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    // const parsed = addAddressSchema.safeParse(payload);

    const key = payload.key;
    const value = payload.value;

    await db.insert(settings).values({ key, value }).onConflictDoUpdate({
      target: settings.key,
      set: { value },
    });
    revalidatePath("/dashboard/settings");
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
    // const allSettings = await db
    //   .select()
    //   .from(settings)
    //   .where(eq(settings.key, "address"));
    const allSettings = await db.query.settings.findMany();
    if (!allSettings) {
      return new NextResponse(
        JSON.stringify({
          error: "Not found",
        }),
        { status: 404 }
      );
    }
    console.log({ allSettings });
    return NextResponse.json(allSettings);
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
