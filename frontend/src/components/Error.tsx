const Error = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={`text-red-400 text-center mb-2 text-xl" ${className}`}>{children}</div>;
};

export default Error;
