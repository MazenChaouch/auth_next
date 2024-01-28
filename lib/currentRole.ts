import { auth } from "@/auth"

export const CurrentRole = async () => {
    const authentication = await auth();
    return authentication?.user.role;
}