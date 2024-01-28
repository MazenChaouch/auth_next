import { useCurrentUser } from "@/hooks/use-current-user";
import { DeleteButton } from "./delete-button";
import { ExtendedUser } from "@/next_auth";

interface UserInfoProps {
  user: ExtendedUser;
}
export const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <>
      <div className="space-y-7">
        {userInfo("ID", user?.id || "No ID")}
        {userInfo("Name", user?.name || "No name")}
        {userInfo("Email", user?.email || "No email")}
        {userInfo("Role", user?.role || "No role")}
        {userInfo("Two factor enabled", user?.twofactor ? "Yes" : "No")}
        {userInfo("provider", user?.provider || "Credentials")}
      </div>
      <div className="flex justify-center">
        <DeleteButton user={user} />
      </div>
    </>
  );
};

const userInfo = (label: string, value: string) => (
  <div className="flex items-center justify-between shadow-sm rounded-lg p-3 bg-whitet/10">
    <span className="font-semibold">{label}</span>
    <span>{value}</span>
  </div>
);
