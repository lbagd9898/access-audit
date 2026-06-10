"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/lib/validations/auth";

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function PasswordInput({
  id,
  name,
  autoComplete,
  placeholder,
}: {
  id: string;
  name: string;
  autoComplete: string;
  placeholder: string;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={visible ? "text" : "password"}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="w-full rounded-lg border border-zinc-300 px-3 py-2 pr-10 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#001f5b] focus:border-transparent"
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
      >
        <EyeIcon open={visible} />
      </button>
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [errors, setErrors] = useState<unknown[]>([]);

  async function handleSubmit(formData: FormData) {
    console.log("submitted");

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    // Client-side Zod validation
    const result = registerSchema.safeParse(data);
    if (!result.success) {
      // Flatten turns ZodError into { name: "msg", email: "msg" }
      setErrors(result.error.issues);
      return; // stop here — don't hit the API
    }
    console.log("form data read", data);
    setErrors([]);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result.data), // use parsed data, not raw form data
    });

    if (!res.ok) {
      const json = await res.json();
      setErrors(json.error);
      return;
    }

    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col gap-10 items-center justify-start bg-zinc-50 px-4">
      <h1 className="text-4xl font-bold text-[#001f5b] p-15">
        Welcome to Auditly! Accessibility auditing for sports venues.
      </h1>

      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-[#001f5b] px-8 py-6">
          <h2 className="text-2xl font-bold text-center text-white tracking-wide">
            Create account
          </h2>
        </div>

        <div className="px-8 py-8 flex flex-col gap-4">
          <form action={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="name"
                className="text-sm font-medium text-zinc-700"
              >
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Jane Smith"
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#001f5b] focus:border-transparent"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-zinc-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
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
              <PasswordInput
                id="password"
                name="password"
                autoComplete="new-password"
                placeholder="••••••••"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="confirm-password"
                className="text-sm font-medium text-zinc-700"
              >
                Confirm password
              </label>
              <PasswordInput
                id="confirm-password"
                name="confirmPassword"
                autoComplete="new-password"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="mt-1 w-full rounded-lg bg-[#001f5b] py-2 text-sm font-semibold text-white hover:bg-[#002a7a] transition-colors"
            >
              Register
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

          <p className="text-center text-sm text-zinc-500">
            Already have an account?{" "}
            <Link
              href="/"
              className="font-medium text-[#001f5b] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
