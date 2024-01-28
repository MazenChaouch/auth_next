import { CurrentRole } from "@/lib/currentRole";
import { NextResponse } from "next/server";

export async function GET() {
    const role  = await CurrentRole();
    if (role == "ADMIN") {
        return new NextResponse(null, { status: 200 });
    }
    return new NextResponse(null, { status: 403 });
}