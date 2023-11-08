import { ErrorMessage } from '@hookform/error-message';
import When from '../When';

const Input = ({
  placeholder,
  className,
  errors,
  name,
  ...rest
}: {
  placeholder?: string;
  className?: string;
  errors?: any;
  name: string;
  rest?: any;
}) => {
  return (
    <div className="input">
      <input
        name={name}
        className={`py-2 pl-2 rounded-lg w-full border-none outline-none mb-2 ${className}`}
        placeholder={placeholder}
        {...rest}
      />
      <When isTrue={errors}>
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => {
            return <span className="text-red-400">{message}</span>;
          }}
        />
      </When>
    </div>
  );
};

export default Input;
