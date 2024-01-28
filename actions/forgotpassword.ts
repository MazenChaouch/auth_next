"use server";

import * as z from 'zod';
import { ForgotPasswordSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';
import { generateForgotPasswordToken } from '@/lib/tokens';
import { sendPasswordRestEmail } from '@/lib/mail';

export const forgotPassword = async (values: z.infer<typeof ForgotPasswordSchema>) => {
    const validatedData = ForgotPasswordSchema.safeParse(values);
    if (!validatedData.success) {
        return { error: "Invalid data!" };
    }
    const { email } = validatedData.data;
    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email) {
        return { error: "Email does not exist!" };
    }
    if (!existingUser.emailVerified) {
        return { error: "Email not verified!" };
    }
    const forgotPasswordToken = await generateForgotPasswordToken(email);


    await sendPasswordRestEmail(
        forgotPasswordToken.email,
        forgotPasswordToken.token
    );

    return { success: "reset password email sent!" };
     
 }