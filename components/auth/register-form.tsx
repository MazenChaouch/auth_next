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
import { RegisterSchema } from "@/schemas";
import { CardWapper } from "./card-wapper";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { register } from "@/actions/register";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<Zod.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  const onSubmit = (data: Zod.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(data).then((data) => {
        setSuccess(data.success);
        setError(data.error);
      });
      if (success) {
        form.reset();
      }
    });
  };
  return (
    <CardWapper
      headerlabel="create an account"
      backButtonHref="/auth/login"
      backButtonLabel="already have an account?"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field, formState: { errors } }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name} className="font-bold">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="john doe"
                      disabled={isPending}
                    />
                  </FormControl>
                  {errors[field.name] && <FormMessage />}
                </FormItem>
              )}
            />
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
                      placeholder="john.doe@exemple.com"
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
                  <FormLabel htmlFor={field.name} className="font-bold">
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
              Register
            </Button>
          </div>
        </form>
      </Form>
    </CardWapper>
  );
};
