"use client";

import Link from "next/link";
import { Button } from "../ui/button";

interface BackButtonProps {
  label: string;
  href: string;
}
export const BackButton = ({ label, href }: BackButtonProps) => {
  return (
    <Link href={href}>
      <Button variant="link">{label}</Button>
    </Link>
  );
};
