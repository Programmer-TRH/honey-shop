"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { registerSchema } from "@/lib/shcema/zodSchema";
import { useRouter } from "next/navigation";
import { LoaderPinwheel, ServerCog } from "lucide-react";
import { registrationAction } from "@/actions/register-action";
import PasswordInput from "../shared/password-input";
import { toast } from "@/hooks/use-toast";

export default function Register() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });
  const router = useRouter();

  const onSubmit = async (data: any) => {
    const result = await registrationAction(data);
    console.log("Result:", result);

    if (result.success) {
      toast({
        title: "Success",
        description: result.message || "Registration Successfull.",
        variant: "default",
      });
      router.replace("/dashboard");
    } else {
      toast({
        title: "Error",
        description: result.message || "Registration failed",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 dark:bg-transparent">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card m-auto h-fit w-full max-w-md rounded-[calc(var(--radius)+.125rem)] border shadow-md dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="p-8 pb-6">
          <div>
            <Link href="/" aria-label="go home">
              <ServerCog className="h-8 w-8 text-primary" />
            </Link>
            <h1 className="mb-1 mt-4 text-xl font-semibold">
              Create Your Account
            </h1>
            <p className="text-sm">Welcome! Create an account to get started</p>
          </div>

          <hr className="my-4 border-dashed" />
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="firstname" className="block text-sm">
                  Firstname
                </Label>
                <Input {...register("first_name")} id="firstname" />
                {errors.first_name && (
                  <p className="text-red-500 text-sm">
                    {errors?.first_name?.message as string}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastname" className="block text-sm">
                  {" "}
                  Lastname{" "}
                </Label>{" "}
                <Input {...register("last_name")} id="lastname" />
                {errors.last_name && (
                  <p className="text-red-500 text-sm">
                    {errors.last_name.message as string}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">
                Email
              </Label>
              <Input {...register("email")} id="email" />
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.email.message as string}
                </p>
              )}
            </div>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <PasswordInput
                  value={field.value || ""}
                  onChange={field.onChange}
                  error={errors.password?.message}
                />
              )}
            />
            <Button
              type="submit"
              className={`w-full ${
                isSubmitting
                  ? "pointer-events-none cursor-not-allowed bg-primary/95 "
                  : "cursor-pointer"
              } `}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex gap-2 items-center justify-center">
                  <span>
                    <LoaderPinwheel className=" size-4 animate-spin" />
                  </span>
                  <span> Creating account</span>
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
          </div>
        </div>
        <div className="bg-muted rounded-(--radius) border p-3">
          <p className="text-accent-foreground text-center text-sm">
            Have an account ?
            <Button asChild variant="link" className="px-2">
              <Link href="/login">Sign In</Link>
            </Button>
          </p>
        </div>
      </form>
    </section>
  );
}
