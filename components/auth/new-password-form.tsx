"use client";

import { useEffect, useState, useTransition } from "react";
import { CardWapper } from "./card-wapper";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Button } from "../ui/button";
import { FormControl, FormMessage } from "../ui/form";
import { Form, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { ChangePasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { changepassword } from "@/actions/changepassword";
import { useSearchParams } from "next/navigation";
import { getForgotPasswordTokenByToken } from "@/data/forgot-password-token";

export const NewPassWordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [urlError, setUrlError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const urlToken = searchParams.get("token") || null;
  useEffect(() => {
    if (!urlToken) {
      setUrlError("Invalid Token");
    }
  }, [urlToken]);

  const form = useForm<Zod.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      new_password: "",
      confirm_password: "",
    },
  });
  const onSubmit = (data: Zod.infer<typeof ChangePasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      changepassword(data, urlToken).then((data) => {
        if (data.success) {
          setSuccess(data.success);
        } else {
          setError(data.error);
        }
      });
    });
  };
  return (
    <CardWapper
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
      headerlabel="Change Password"
    >
      {urlError ? (
        <FormError message={urlError} />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-5">
              <FormField
                control={form.control}
                name="new_password"
                render={({ field, formState: { errors } }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name} className="font-bold">
                      New Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="new password"
                        type="password"
                        disabled={isPending}
                      />
                    </FormControl>
                    {errors[field.name] && <FormMessage />}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field, formState: { errors } }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name} className="font-bold">
                      Confirm New Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="confirme password"
                        type="password"
                        disabled={isPending}
                      />
                    </FormControl>
                    {errors[field.name] && <FormMessage />}
                  </FormItem>
                )}
              />
              <FormSuccess message={success} />
              <FormError message={error} />
              <Button
                type="submit"
                variant={"default"}
                disabled={isPending}
                className="w-full"
              >
                Change Password
              </Button>
            </div>
          </form>
        </Form>
      )}
    </CardWapper>
  );
};
