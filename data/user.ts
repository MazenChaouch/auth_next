import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const User = await db.user.findFirst({ where: { email } });
    return User;
  } catch {
    return null;
  }
};
export const getUserById = async (id: string) => {
  try {
    const User = await db.user.findFirst({ where: { id } });
    return User;
  } catch {
    return null;
  }
};
export const deleteUserById = async (id: string) => {
  try {
    const User = await db.user.delete({ where: { id } });
    return User;
  } catch {
    return null;
  }
};
