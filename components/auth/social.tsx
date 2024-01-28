"use client";

import { Icon } from "@iconify/react";
import { Button } from "../ui/button";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";

export const Social = () => {
  const onclick = (provider: "google" | "github") => {
    signIn(provider);
    console.log(provider, "clicked");
  };
  return (
    <div className="w-full flex justify-center items-center gap-x-2">
      <Button
        variant="outline"
        className="flex-grow"
        onClick={() => onclick("google")}
      >
        <Icon icon="flat-color-icons:google" className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        className="flex-grow"
        onClick={() => onclick("github")}
      >
        <Icon icon="mdi:github" className="h-6 w-6" />
      </Button>
    </div>
  );
};
