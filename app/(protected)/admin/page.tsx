"use client";

import { RoleGate } from "@/components/auth/role-gate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { admin } from "@/lib/admin";
import { toast } from "sonner";

const AdminPage = () => {
  const onAPIRouteClick = async () => {
    fetch("/api/admin").then((Response) => {
      if (Response.ok) {
        return toast.success("API Route Success");
      } else {
        return toast.error("API Route Failed");
      }
    });
  };
  const onServerActionClick = async () => {
    admin().then((Response) => {
      if (Response.success) {
        return toast.success("Server Action Success");
      }
      if (Response.error) {
        return toast.error("Server Action Failed");
      }
    });
  };
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <h1 className="text-2xl font-bold text-center">🔑 Admin Page</h1>
      </CardHeader>
      <CardContent className="space-y-5">
        <RoleGate AllowedRole="ADMIN" />
        <div className="flex justify-between items-center p-4 shadow rounded-lg">
          <p>Admin-only API Route</p>
          <Button onClick={onAPIRouteClick}>Click to test</Button>
        </div>
        <div className="flex justify-between items-center p-4 shadow rounded-lg">
          <p>Admin-only Server Action</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
