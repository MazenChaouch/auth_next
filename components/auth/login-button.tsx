"use client";

import { useRouter } from "next/navigation";

interface loginButtonProps {
  children: React.ReactNode;
  node?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  node = "redirect",
  asChild = false,
}: loginButtonProps) => {
  const router = useRouter();

  const onclick = () => {
    router.push("/auth/login");
  };
  if (node === "modal") {
    return <span>Modal</span>;
  }
  return (
    <span className="cursor-pointer" onClick={onclick}>
      {children}
    </span>
  );
};
