"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";

interface RoleGateProps {
  AllowedRole: string;
}

export const RoleGate = ({ AllowedRole }: RoleGateProps) => {
  const role = useCurrentRole();
  if (AllowedRole === role) {
    return <FormSuccess message="You are allowed see this!" />;
  } else {
    return <FormError message="You are not allowed see this!" />;
  }
};
