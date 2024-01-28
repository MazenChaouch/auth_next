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
import { CardWapper } from "./card-wapper";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { forgotPassword } from "@/actions/forgotpassword";
import { ForgotPasswordSchema } from "@/schemas";

export const ForgotPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<Zod.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (data: Zod.infer<typeof ForgotPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      forgotPassword(data).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };
  return (
    <CardWapper
      headerlabel="Forgot Password"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-5">
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
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              type="submit"
              variant={"default"}
              disabled={isPending}
              className="w-full"
            >
              Send password reset email
            </Button>
          </div>
        </form>
      </Form>
    </CardWapper>
  );
};
