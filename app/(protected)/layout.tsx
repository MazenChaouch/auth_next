import { Navbar } from "./_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div
      className="h-full flex flex-col justify-center items-center gap-y-10
      bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))]
    to-sky-600 from-cyan-200"
    >
      <Navbar />
      {children}
    </div>
  );
};
export default ProtectedLayout;
