import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { signInSchema } from "@/lib/validations/auth";

export async function POST(req: Request) {
  console.log("route reached");

  const body = await req.json();

  //validate form data
  const result = signInSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: result.error.issues }, { status: 400 });
  }

  //IF RESULT IS GOOD WE NEED TO AUTH THE USER
}
