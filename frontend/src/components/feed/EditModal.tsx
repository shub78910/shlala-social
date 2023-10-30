import { Controller, useForm } from 'react-hook-form';
import Modal from '../Modal';
import Button from '../formComponents/Button';
import ButtonWithSpinner from '../formComponents/ButtonWithSpinner';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { patchDataAPI } from '@/utils/axiosCall';
import { useState } from 'react';
import TextArea from '../formComponents/TextArea';

const EditModal = ({
  setShowEditModal,
  _id,
  caption,
  refetch,
}: {
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  _id: string;
  caption: string;
  refetch?: any;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const mutation = useMutation(({ caption }: { caption: string }) => {
    return patchDataAPI(`post/${_id}`, { caption });
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        caption: yup.string().required('Caption is required'),
      }),
    ),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);

    await mutation.mutateAsync({ caption: data.caption });
    setLoading(false);
    refetch();

    setShowEditModal(false);
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="caption" className="text-lg font-medium">
            Edit Caption
          </label>
          <Controller
            name="caption"
            control={control}
            defaultValue={caption}
            render={({ field }) => (
              <TextArea
                {...field}
                placeholder="Edit your caption..."
                errors={errors}
                name="caption"
                {...{
                  className: 'w-full mt-4 p-1 outline-none',
                }}
              />
            )}
          />
        </div>
      </form>
      <div className="flex justify-end gap-4">
        <Button
          className="bg-gray-200 text-gray-700 px-4 py-2"
          {...{
            onClick: () => setShowEditModal(false),
          }}
        >
          No
        </Button>
        <ButtonWithSpinner
          className="bg-gray-400 text-gray-700 px-4 py-2"
          {...{
            onClick: handleSubmit(onSubmit),
            spinner: loading,
          }}
        >
          Yes
        </ButtonWithSpinner>
      </div>
    </Modal>
  );
};
export default EditModal;
