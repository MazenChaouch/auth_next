import { Icon } from "@iconify/react/dist/iconify.js";
interface FormSuccessProps {
  message?: string;
}
export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;
  return (
    <div className="flex items-center text-emerald-500 bg-emerald-500/15 p-3 rounded-lg gap-x-2 font-medium">
      <Icon
        icon="lucide:check-circle-2"
        className="min-h-7 min-w-7 max-h-5 max-w-5"
      />
      <span>{message}</span>
    </div>
  );
};
