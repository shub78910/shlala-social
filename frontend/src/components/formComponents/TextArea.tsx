import { ErrorMessage } from '@hookform/error-message';

const TextArea = ({
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
    <div>
      <textarea
        name={name}
        className={`py-2 pl-2 rounded-lg w-full border-none outline-none mb-2 resize-y ${className}`}
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

export default TextArea;
