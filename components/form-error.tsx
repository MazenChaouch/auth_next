import { Icon } from "@iconify/react/dist/iconify.js";
interface FormErrorProps {
  message?: string;
}
export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div className="flex items-center text-red-500 bg-red-500/15 p-3 rounded-lg gap-x-2 font-medium">
      <Icon
        icon="lucide:alert-triangle"
        className="min-h-7 min-w-7 max-h-5 max-w-5"
      />
      <span>{message}</span>
    </div>
  );
};
