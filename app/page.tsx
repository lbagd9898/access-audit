"use client";

import Link from "next/link";
import { useState } from "react";
import { signInSchema } from "@/lib/validations/auth";

export default function Home() {
  const [errors, setErrors] = useState<unknown[]>([]);

  async function handleSubmit(formData: FormData) {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const result = signInSchema.safeParse(data);
    console.log(result);

    if (!result.success) {
      setErrors(result.error.issues);
      return;
    }

    setErrors([]);
  }
  return (
    <div className="min-h-screen flex flex-col gap-10 items-center justify-start bg-zinc-50 px-4">
      <h1 className="text-4xl font-bold text-[#001f5b] p-15">
        Welcome to Auditly! Accessibility auditing for sports venues.
      </h1>
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-[#001f5b] px-8 py-6">
          <h1 className="text-2xl font-bold text-center text-white tracking-wide">
            Auditly
          </h1>
        </div>

        <div className="px-8 py-8 flex flex-col gap-4">
          <form action={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-zinc-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#001f5b] focus:border-transparent"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-zinc-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#001f5b] focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="mt-1 w-full rounded-lg bg-[#001f5b] py-2 text-sm font-semibold text-white hover:bg-[#002a7a] transition-colors"
            >
              Sign in
            </button>
          </form>
          {errors.length > 0 && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 flex flex-col gap-1">
              {errors.map((error: unknown, index: number) => {
                const e = error as {
                  code: string;
                  path: string[];
                  message: string;
                };
                return (
                  <p key={index} className="text-sm text-red-600">
                    {e.message}
                  </p>
                );
              })}
            </div>
          )}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-zinc-200" />
            <span className="text-xs text-zinc-400">or</span>
            <div className="h-px flex-1 bg-zinc-200" />
          </div>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path
                d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
                fill="#4285F4"
              />
              <path
                d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
                fill="#34A853"
              />
              <path
                d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"
                fill="#FBBC05"
              />
              <path
                d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          <Link
            href="/register"
            className="block w-full rounded-lg border border-zinc-300 py-2 text-center text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            Venue Manager Registration
          </Link>
        </div>
      </div>
    </div>
  );
}
