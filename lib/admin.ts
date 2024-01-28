"use server";

import { CurrentRole } from "./currentRole";



export const admin = async () => {
    const role  = await CurrentRole();
    if (role == "ADMIN") {
        return {success: "ALLOWED!"}
    }
    return {error: "FORBIDDEN!"}

}