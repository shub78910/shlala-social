const Button = ({ children, className, ...rest }: { children: React.ReactNode; className?: string; rest?: any }) => {
  return (
    <button className={`p-2 rounded-lg border-none cursor-pointer ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
