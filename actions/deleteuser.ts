"use server";
import bcrypt from "bcryptjs";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { DeleteAccountSchema } from "@/schemas";
import { signOut } from "@/auth";

export const deleteuser = async (data: Zod.infer<typeof DeleteAccountSchema>, id: string) => {
    const validatedData = DeleteAccountSchema.safeParse(data);
    if (!validatedData.success) {
        return { error: "Invalid data!" };
    }

    const { password } = validatedData.data;

    const user = await getUserById(id);
    if (!id || id === "No ID") {
        return { error: "Account already deleted!" };
    }
    if (!user || !user.password) {
        return { error: "User deleted or not found!" };
    }


    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return { error: "Password incorrect!" };
    }

    const res = await db.user.delete({ where: { id } });
    if (!res) {
        return { error: "User deletion failed!" };
    }
    await signOut();
    return { success: "User deleted!" };
};
