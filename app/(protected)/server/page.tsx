import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/currentUser";
import { UserInfo } from "../_components/user-info";
import { ExtendedUser } from "@/next_auth";

const ServerPage = async () => {
  const user = (await currentUser()) as ExtendedUser;

  return (
    <Card className="w-[600px] space-y-5">
      <CardHeader>
        <h1 className="text-2xl font-bold text-center">💻 Server Page</h1>
      </CardHeader>
      <CardContent>
        <UserInfo user={user} />
      </CardContent>
    </Card>
  );
};
export default ServerPage;
