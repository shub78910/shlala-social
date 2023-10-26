import { ErrorMessage } from '@hookform/error-message';

const Input = ({
  placeholder,
  className,
  errors,
  name,
  ...rest
}: {
  placeholder?: string;
  className?: string;
  errors: any;
  name: string;
  rest?: any;
}) => {
  return (
    <div className="input">
      <input
        name={name}
        className={`p-2 py-4 rounded-lg w-full border-none mb-2 ${className}`}
        placeholder={placeholder}
        {...rest}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => {
          return <span className="text-red-400">{message}</span>;
        }}
      />
    </div>
  );
};

export default Input;
