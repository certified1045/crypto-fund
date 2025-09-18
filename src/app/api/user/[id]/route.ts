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
    const row = await db
      .select()
      .from(users)
      .leftJoin(payments, eq(payments.userId, users.id))
      .where(eq(users.id, id));
    if (!row.length)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(row[0]);
  } catch (err) {
    console.log({ err });
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
