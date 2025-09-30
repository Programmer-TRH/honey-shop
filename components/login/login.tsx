"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { loginAction } from "@/actions/loginAction";
import React, { useActionState } from "react";
import { LoaderPinwheel, ServerCog } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

type LoginState = {
  data?: {
    email?: string;
    password?: string;
    general?: string[];
    redirectTo?: string;
  };
  errors?: {
    email?: string[];
    password?: string[];
    general?: string[];
    [key: string]: string[] | undefined;
  } | string;
  success?: boolean;
};

export default function Login() {
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(loginAction, {});
  const router = useRouter();
  React.useEffect(() => {
    if (!state) return;

    // ✅ Success message
    const successMessage = state.data?.general?.[0];
    if (successMessage) {
      toast({
        title: "Success",
        description: successMessage,
      });
    }

    // ❌ General error message
    const generalError =
      typeof state.errors === "object" && state.errors?.general?.[0]
        ? state.errors.general[0]
        : undefined;
    if (generalError) {
      toast({
        title: "Error",
        description: generalError,
        variant: "destructive",
      });
    }

    // 🔁 Redirect on success
    if (state.success && state.data?.redirectTo) {
      router.replace("/dashboard");
    }

    // 🧠 Field-level Zod errors
    if (state.errors && typeof state.errors === "object") {
      for (const [field, messages] of Object.entries(state.errors)) {
        if (messages?.length) {
          toast({
            title: "Error",
            description: `${messages[0]}`,
            variant: "destructive",
          });
        }
      }
    }

    // 🧨 Fallback for unexpected error shape
    if (typeof state.errors === "string") {
      toast({
        title: "Error",
        description: state?.errors,
        variant: "destructive",
      });
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
              {typeof state?.errors === "object" && state?.errors?.email?.[0] && (
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
              {typeof state?.errors === "object" && state?.errors?.password?.[0] && (
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
