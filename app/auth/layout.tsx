const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="h-full flex justify-center items-center 
      bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))]
    to-sky-600 from-cyan-200"
    >
      {children}
    </div>
  );
};

export default AuthLayout;
