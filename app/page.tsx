"use client";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { LoginButton } from "@/components/auth/login-button";
import Image from "next/image";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});
export default function Home() {
  return (
    <div className="flex flex-col h-full justify-center items-center bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] to-sky-600 from-cyan-200">
      <div className="text-center space-y-6 p-8 bg-whitet rounded-xl">
        <h1
          className={cn(
            "flex justify-center text-5xl text-blackt font-bold",
            poppins.className,
          )}
        >
          <Icon icon="fxemoji:lock" className="h-11 w-11" />
          Auth
        </h1>
        <p
          className={cn(
            "text-2xl text-blackt font-bold max-w-[530px]",
            poppins.className,
          )}
        >
          An Advenced and secured authentication system built with
        </p>
        <div className="flex justify-between space-x-2 rounded-3xl bg-slate-300 p-2">
          <Link href={"https://nextjs.org/"} target="_blank">
            <Icon icon="logos:nextjs-icon" className="h-11 w-11" />
          </Link>
          <Link href={"https://tailwindcss.com"} target="_blank">
            <Icon icon="skill-icons:tailwindcss-dark" className="h-11 w-11" />
          </Link>
          <Link href={"https://prisma.io"} target="_blank">
            <Icon icon="devicon:prisma" className="h-11 w-11" />
          </Link>
          <Link href={"https://www.typescriptlang.org/"} target="_blank">
            <Icon icon="logos:typescript-icon" className="h-11 w-11" />
          </Link>
          <Link href={"https://neon.tech/"} target="_blanc" tabIndex={2}>
            <Icon icon="logos:neon" className="h-11 w-15" />
          </Link>
          <Link href={"https://authjs.dev"} tabIndex={2} target="_blank">
            <Image
              alt="Authjs.dev Logo"
              src={
                "https://raw.githubusercontent.com/nextauthjs/next-auth/main/docs/static/img/logo/logo.png"
              }
              width={44}
              height={44}
            />
          </Link>
          <Link href={"https://ui.shadcn.com/"} target="_blank">
            <Icon icon="simple-icons:shadcnui" className="h-11 w-11" />
          </Link>
        </div>
        <LoginButton>
          <Button className="mt-6" size={"lg"}>
            Login
          </Button>
        </LoginButton>
      </div>
    </div>
  );
}
