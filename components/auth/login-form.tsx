"use client";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { LoginSchema } from "@/schemas";
import { CardWapper } from "./card-wapper";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [twofactor, setTwoFactor] = useState<boolean | undefined>(false);
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "You already have an account with this email. Please login and link your account."
      : "";

  const form = useForm<Zod.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data: Zod.infer<typeof LoginSchema>) => {
    console.log(data);
    setError("");
    setSuccess("");

    startTransition(() => {
      login(data)
        .then((data) => {
          if (data?.error) {
            setError(data?.error);
          }
          if (data?.success) {
            setSuccess(data?.success);
          }
          if (data?.twofactor) {
            setTwoFactor(true);
          }
        })
        .catch(() => setError("Something went wrong, please try again."));
    });
  };
  return (
    <CardWapper
      headerlabel="Welcome Back!"
      backButtonHref="/auth/register"
      backButtonLabel="don't have an account?"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-5">
            {twofactor && (
              <>
                <FormField
                  control={form.control}
                  name="twofactor"
                  render={({ field, formState: { errors } }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name} className="font-bold">
                        2FA Code
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="000000"
                          type="text"
                          disabled={isPending}
                        />
                      </FormControl>
                      {errors[field.name] && <FormMessage />}
                    </FormItem>
                  )}
                />
              </>
            )}
            {!twofactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, formState: { errors } }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name} className="font-bold">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your email"
                          type="email"
                          disabled={isPending}
                        />
                      </FormControl>
                      {errors[field.name] && <FormMessage />}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field, formState: { errors } }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name} className="font-bold ">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="******"
                          type="password"
                          disabled={isPending}
                        />
                      </FormControl>
                      {errors[field.name] && <FormMessage />}
                      <Button
                        size={"sm"}
                        variant={"link"}
                        className="px-0"
                        asChild
                      >
                        <Link href="/auth/forgot-password">
                          Forgot Password?
                        </Link>
                      </Button>
                    </FormItem>
                  )}
                />
              </>
            )}

            <FormError message={error || urlError} />
            <FormSuccess message={success} />
            <Button
              type="submit"
              variant={"default"}
              disabled={isPending}
              className="w-full"
            >
              {twofactor ? "Verify" : "Login"}
            </Button>
          </div>
        </form>
      </Form>
    </CardWapper>
  );
};
