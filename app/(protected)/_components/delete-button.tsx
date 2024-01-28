"use client";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { deleteuser } from "@/actions/deleteuser";
import { Input } from "@/components/ui/input";
import { DeleteAccountSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { ExtendedUser } from "@/next_auth";

interface DeleteButtonProps {
  user: ExtendedUser;
}

export const DeleteButton = (user: DeleteButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<Zod.infer<typeof DeleteAccountSchema>>({
    resolver: zodResolver(DeleteAccountSchema),
    defaultValues: {
      password: "",
    },
  });
  const id = user.user.id;
  const onSubmit = (data: Zod.infer<typeof DeleteAccountSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      deleteuser(data, id)
        .then((data) => {
          if (data?.error) {
            setError(data?.error);
          }
          if (data?.success) {
            setSuccess(data?.success);
          }
        })
        .catch((err) => setError(err.message));
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="flex justify-center mt-10">
        <Button variant={"destructive"}>Delete account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            <p className="text-red-500 text-sm">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 mt-4 text-black"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field, formState: { errors } }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="******"
                          disabled={isPending}
                        />
                      </FormControl>
                      {errors[field.name] && <FormMessage />}
                    </FormItem>
                  )}
                />
                <FormError message={error} />
                <FormSuccess message={success} />
                <div className="flex justify-end space-x-2">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>

                  <Button
                    type="submit"
                    variant={"destructive"}
                    disabled={isPending}
                  >
                    Confirm
                  </Button>
                </div>
              </form>
            </Form>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};
