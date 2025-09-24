import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/db";
import { payments, users } from "@/db/schema/schema";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    console.log({ _ });
    const { id } = await params;
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
      with: { payments: true },
    });

    if (!user)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    console.log({ user });
    return NextResponse.json({ users: user });
  } catch (err) {
    console.log({ err });
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
