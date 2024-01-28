"use client";

import { deleteuser } from "@/actions/deleteuser";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserInfo } from "../_components/user-info";
import { ExtendedUser } from "@/next_auth";
const ClientPage = () => {
  const user = useCurrentUser() as ExtendedUser;
  return (
    <Card className="w-[600px] space-y-5">
      <CardHeader>
        <h1 className="text-2xl font-bold text-center">👤 Client Page</h1>
      </CardHeader>
      <CardContent>
        <UserInfo user={user} />
      </CardContent>
    </Card>
  );
};

export default ClientPage;
