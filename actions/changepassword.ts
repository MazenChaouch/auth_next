"use server";

import { getForgotPasswordTokenByToken } from "@/data/forgot-password-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { ChangePasswordSchema } from "@/schemas";
import bycrypt from "bcryptjs";
import { get } from "http";
import * as z from "zod";

export const changepassword = async (values: z.infer<typeof ChangePasswordSchema>, token?: string | null ) => {

    if (!token) {
        return { error: "Invalid token!" };
    }

    const validToken = await getForgotPasswordTokenByToken(token);

    if (!validToken) {
        return { error: "Invalid token!" };
    }

    if (validToken.expires < new Date()) {
        return { error: "Token has expired!" };
    }

    const validatedData = ChangePasswordSchema.safeParse(values);
    if (!validatedData.success) {
        return { error: "Invalid data!" };
    }

    const { new_password, confirm_password } = validatedData.data;

    if (new_password !== confirm_password) {
        return { error: "Passwords do not match!" };
    }


    const existingUser = await getUserByEmail(validToken.email);
    
    if (!existingUser) {
        return { error: "Email does not exist!" };
    }

    const hashedPassword = await bycrypt.hash(new_password, 10);
    
    
    
    await db.user.update({
        where: {
            id : existingUser.id
        },
        data: {
            password: hashedPassword
        }
    });
    await db.forgotPasswordToken.delete({
        where: {
            token
        }
    });
    
    return { success: "Password changed successfully" };
}