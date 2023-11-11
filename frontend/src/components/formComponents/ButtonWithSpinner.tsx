import When from '../When';
import Loader from '../Loader';

const ButtonWithSpinner = ({
  children,
  className,
  spinner,
  ...rest
}: {
  children: React.ReactNode;
  spinner: boolean;
  className?: string;
  rest?: any;
}) => {
  return (
    <button
      className={`p-2 rounded-lg border-none cursor-pointer flex justify-center gap-2 items-center ${className}`}
      {...rest}
    >
      <When isTrue={!spinner}>
        <div>{children}</div>
      </When>
      <When isTrue={spinner}>
        <div>
          <Loader
            {...{
              height: '20',
              width: '20',
            }}
          />
        </div>
      </When>
    </button>
  );
};

export default ButtonWithSpinner;
