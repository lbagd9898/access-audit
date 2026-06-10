import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { registerSchema } from "@/lib/validations/auth";

export async function POST(req: Request) {
  const body = await req.json();

  // Server-side Zod validation — independent of the client
  const result = registerSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: result.error.issues }, { status: 400 });
  }

  const { name, email, password } = result.data; // fully typed and safe

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: [{ message: "Email already in use" }] },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { email, name, role: "manager", password: hashedPassword },
  });

  console.log("user created", user);

  return NextResponse.json(
    { user: { id: user.id, email: user.email } },
    { status: 201 }
  );
}
