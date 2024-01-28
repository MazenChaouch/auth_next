import { db } from "@/lib/db";

export const getAccountByUserId = async (userId: string) => {
    try {
        const Account = await db.account.findFirst({ where: { userId } });
        return Account;
    } catch  {
        return null;
    }
}