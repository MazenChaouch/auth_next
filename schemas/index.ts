import * as z from "zod";

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Email is invalid",
    }),
});

export const ChangePasswordSchema = z.object({
  new_password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
  confirm_password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Email is invalid",
    }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  twofactor: z.optional(
    z
      .string()
      .min(1, {
        message: "Two factor code is required",
      })
      .max(6, {
        message: "Two factor code is invalid",
      }),
  ),
});

export const RegisterSchema = z.object({
  email: z
    .string()
    .email({
      message: "Email is invalid",
    })
    .min(1, {
      message: "Email is required",
    }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const DeleteAccountSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});
