"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { loginAction } from "@/action/auth/loginAction";
import React, { useActionState } from "react";
import { LoaderPinwheel, ServerCog } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Login() {
  const [state, formAction, isPending] = useActionState(loginAction, undefined);
  const router = useRouter();
  React.useEffect(() => {
    if (!state) return;

    // ✅ Success message
    const successMessage = state.data?.general?.[0];
    if (successMessage) {
      toast.success(successMessage);
    }

    // ❌ General error message
    const generalError = state.errors?.general?.[0];
    if (generalError) {
      toast.error(generalError);
    }

    // 🔁 Redirect on success
    if (state.success && state.data?.redirectTo) {
      router.replace(state.data.redirectTo);
    }

    // 🧠 Field-level Zod errors
    if (state.errors && typeof state.errors === "object") {
      for (const [field, messages] of Object.entries(state.errors)) {
        if (messages?.length) {
          toast.error(`${messages[0]}`);
        }
      }
    }

    // 🧨 Fallback for unexpected error shape
    if (typeof state.errors === "string") {
      toast.error(state.errors);
    }
  }, [state]);

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 dark:bg-transparent">
      <form
        action={formAction}
        className="bg-card m-auto h-fit w-full max-w-md rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="p-8 pb-6">
          <div>
            <Link href="/" aria-label="go home">
              <ServerCog className="h-8 w-8 text-primary" />
            </Link>
            <h1 className="mb-1 mt-4 text-xl font-semibold text-center">
              Sign In to Your Account
            </h1>
            <p className="text-sm text-center">
              Welcome back! Sign in to continue
            </p>
          </div>

          <hr className="my-4 border-dashed" />

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">
                Username
              </Label>
              <Input
                type="email"
                name="email"
                id="email"
                defaultValue={state?.data?.email}
                required
              />
              {state?.errors?.email?.[0] && (
                <p className="text-red-500 text-sm">{state.errors.email[0]}</p>
              )}
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm">
                  Password
                </Label>
                <Button asChild variant="link" size="sm">
                  <Link href="#" className="text-sm">
                    Forgot your Password?
                  </Link>
                </Button>
              </div>
              <Input
                type="password"
                name="password"
                id="password"
                defaultValue={state?.data?.password}
                required
              />
              {state?.errors?.password?.[0] && (
                <p className="text-red-500 text-sm">
                  {state.errors.password[0]}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className={`w-full ${
                isPending
                  ? "cursor-not-allowed pointer-events-none bg-primary/95"
                  : "cursor-pointer"
              }`}
              disabled={isPending}
            >
              {isPending ? (
                <div className="flex gap-2 items-center justify-center">
                  <span>
                    <LoaderPinwheel className=" size-4 animate-spin" />
                  </span>
                  <span> Signing in </span>
                </div>
              ) : (
                <span>Sign In</span>
              )}
            </Button>
          </div>
        </div>

        <div className="bg-muted rounded-(--radius) border p-3">
          <p className="text-accent-foreground text-center text-sm">
            Don't have an account?
            <Button asChild variant="link" className="px-2">
              <Link href="/register">Create account</Link>
            </Button>
          </p>
        </div>
      </form>
    </section>
  );
}
