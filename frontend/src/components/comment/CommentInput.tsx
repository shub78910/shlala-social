import { Controller } from 'react-hook-form';
import Input from '../formComponents/Input';
import ButtonWithSpinner from '../formComponents/ButtonWithSpinner';

const CommentInput = ({
  handleSubmit,
  onSubmit,
  errors,
  loading,
  control,
  name,
  defaultValue,
}: {
  handleSubmit: any;
  onSubmit: any;
  errors: any;
  loading: any;
  control: any;
  name: string;
  defaultValue?: string;
}) => {
  return (
    <div className="mt-4 flex justify-between items-baseline gap-2">
      <div className="w-full">
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Add a comment"
              errors={errors}
              name={name}
              {...{
                type: 'text',
                className: 'py-4',
              }}
            />
          )}
        />
      </div>

      <div>
        <ButtonWithSpinner
          {...{
            onClick: handleSubmit(onSubmit),
            className: 'bg-blue-500 text-white py-2 px-4 rounded ml-2 min-w-full',
            spinner: loading,
            disabled: loading,
          }}
        >
          Comment
        </ButtonWithSpinner>
      </div>
    </div>
  );
};

export default CommentInput;
