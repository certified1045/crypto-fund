// app/api/settings/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { settings, users } from "@/db/schema/schema";
import { revalidatePath } from "next/cache";
import { editAddressSchema } from "@/lib/zodSchema";
import { eq } from "drizzle-orm";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const payload = await req.json();
  const parsed = editAddressSchema.safeParse(payload);
  if (!parsed.success)
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  try {
    const [user] = await db
      .update(users)
      .set({ walletAdress: parsed.data.address })
      .where(eq(users.id, id))
      .returning();

    console.log({ user });

    if (!user)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({
      users: user,
      message: `${user.username} edited successfully`,
    });
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
