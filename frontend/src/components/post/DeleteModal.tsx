import { useRouter } from 'next/navigation';
import Modal from '../Modal';
import Button from '../formComponents/Button';
import ButtonWithSpinner from '../formComponents/ButtonWithSpinner';
import { useMutation } from '@tanstack/react-query';
import { deleteDataAPI } from '@/utils/axiosCall';
import { useState } from 'react';
import { useAppSelector } from '@/hooks/typeHooks';

const DeleteModal = ({
  setShowDeleteModal,
  _id,
}: {
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  _id: string;
}) => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.user);

  const mutation = useMutation(() => {
    return deleteDataAPI(`post/${_id}`);
  });

  const deletePost = async () => {
    setLoading(true);
    await mutation.mutateAsync();
    setLoading(false);
    router.push(`/profile/${user?._id}`);

    setShowDeleteModal(false);
  };

  return (
    <Modal>
      <div>Sure wanna delete?</div>
      <div className="flex justify-end gap-4">
        <Button
          className="bg-gray-200 text-gray-700 px-4 py-2"
          {...{
            onClick: () => setShowDeleteModal(false),
          }}
        >
          No
        </Button>
        <ButtonWithSpinner
          className="bg-gray-400 text-gray-700 px-4 py-2"
          {...{
            onClick: () => deletePost(),
            spinner: loading,
          }}
        >
          Yes
        </ButtonWithSpinner>
      </div>
    </Modal>
  );
};
export default DeleteModal;
