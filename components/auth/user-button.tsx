"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "./logout-button";

export const UserButton = () => {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} alt="avatar" />
          <AvatarFallback>
            <Icon
              icon="mingcute:user-4-fill"
              className="w-full h-full bg-white text-sky-400"
            />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <LogoutButton>
          <DropdownMenuItem>
            <Icon icon="iconamoon:exit-fill" className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
