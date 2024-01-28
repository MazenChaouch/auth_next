"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});
interface HeaderProps {
  label: string;
}
export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 justify-center items-center">
      <h1 className="flex text-4xl font-bold gap-x-1">
        <Icon icon="fxemoji:lock" className="h-9 w-9" />
        Auth
      </h1>
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
};
