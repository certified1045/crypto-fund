import { NextResponse } from "next/server";

import { db } from "@/db/db";
import { addUserSchema } from "@/lib/zodSchema";
import { users } from "@/db/schema/schema";

export async function POST(req: Request) {
  const payload = await req.json();
  const parsed = addUserSchema.safeParse(payload);
  if (!parsed.success)
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  try {
    const [u] = await db
      .insert(users)
      .values({
        username: parsed.data.username.toLowerCase(),
      })
      .returning();
    return NextResponse.json(
      { ok: true, message: `${u.username} successfully added` },
      { status: 201 }
    );
  } catch (error) {
    const err = error as { cause: { code?: string; constraint?: string } };
    if (err?.cause?.code === "23505") {
      return new NextResponse(
        JSON.stringify({
          errors: [
            {
              path: err.cause.constraint?.split("_")[1],
              message: `A user with this ${
                err.cause.constraint?.split("_")[1]
              } already exists`,
            },
          ],
        }),
        { status: 409 }
      );
    }
    return new NextResponse(
      JSON.stringify({
        message: "Registration failed",
        description: "Server error",
      }),
      { status: 500 }
    );
  }
}

export const GET = async () => {
  try {
    const u = await db.select().from(users);
    if (!users) {
      return new NextResponse(
        JSON.stringify({
          message: "No user found",
        }),
        { status: 404 }
      );
    }
    console.log({ u });
    return new NextResponse(JSON.stringify({ data: u }), { status: 201 });
  } catch (err) {
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
};
