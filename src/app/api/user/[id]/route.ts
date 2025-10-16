import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/db";
import { users } from "@/db/schema/schema";
import { addUserSchema, editUserSchema } from "@/lib/zodSchema";

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

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [user] = await db.delete(users).where(eq(users.id, id)).returning();

    if (!user)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({
      users: user,
      message: `${user.username} deleted successfully`,
    });
  } catch (err) {
    console.log({ err });
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const payload = await req.json();
  const parsed = editUserSchema.safeParse(payload);
  if (!parsed.success)
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  try {
    const { id } = await params;
    const { dealPrice, progress, securityDeposit, username } = parsed.data;
    const [user] = await db
      .update(users)
      .set({ dealPrice, progress: progress[0], securityDeposit, username })
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
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
