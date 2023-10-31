import { ImageUploadResponse } from '@/Interface';
import ImageUploader from '@/components/ImageUploader';
import Modal from '@/components/Modal';
import Button from '@/components/formComponents/Button';
import ButtonWithSpinner from '@/components/formComponents/ButtonWithSpinner';
import Input from '@/components/formComponents/Input';
import TextArea from '@/components/formComponents/TextArea';
import { patchDataAPI, postDataAPI } from '@/utils/axiosCall';
import { uploadImage } from '@/utils/uploadImage';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { MdOutlineCancel } from 'react-icons/md';

const EditProfileModal = ({
  userName,
  bio,
  profilePicture,
  setModalOpen,
  refetch,
}: {
  userName: string;
  bio: string;
  profilePicture: string;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: any;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const [imageSrc, setImageSrc] = useState<string>(profilePicture); // only for preview
  const [images, setImages] = useState<any>([]); // to send to uploadImage func

  const mutation = useMutation(
    ({ username, profilePicture, bio }: { username: string; profilePicture?: string; bio: string }) => {
      return patchDataAPI('user/editUser', { username, profilePicture, bio });
    },
  );

  const onSubmit = async (data: any) => {
    setLoading(true);

    let res: ImageUploadResponse | undefined;
    if (images[0]) {
      res = await uploadImage(images[0]);
    }

    // add condition to see if any data is changed

    await mutation.mutateAsync({
      bio: data.bio,
      username: data.username,
      ...(res !== undefined && { profilePicture: res.url }),
    });
    setLoading(false);
    refetch();
    setModalOpen(false);
  };

  return (
    <Modal>
      <div className="flex justify-end cursor-pointer" onClick={() => setModalOpen(false)}>
        <MdOutlineCancel size={20} />
      </div>

      <div>
        <div className="text-xl font-semibold mb-4">Edit Your Profile</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <div className="flex justify-center"> */}
          <div className="mb-4 flex flex-col items-center">
            <label htmlFor="profileImage" className="block font-semibold text-gray-300 mb-2">
              Profile Image
            </label>
            <div>
              <Image src={imageSrc} height={100} width={100} alt="Profile" className="object-cover rounded-full" />
            </div>
            <Controller
              name="profileImage"
              control={control}
              defaultValue={profilePicture}
              render={({ field }) => (
                <ImageUploader
                  {...{
                    control,
                    errors,
                    setImages,
                    setImageSrc,
                    images,
                    showLabel: false,
                  }}
                />
              )}
            />
            {/* </div> */}
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block font-semibold text-gray-300 mb-2">
              Username
            </label>
            <Controller
              name="username"
              control={control}
              defaultValue={userName}
              render={({ field }) => (
                <Input
                  {...{
                    type: 'text',
                    id: 'username',
                    errors: errors,
                    ...field,
                  }}
                />
              )}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bio" className="block font-semibold text-gray-300 mb-2">
              Bio
            </label>
            <Controller
              name="bio"
              control={control}
              defaultValue={bio}
              render={({ field }) => (
                <TextArea
                  {...{
                    id: 'bio',
                    errors: errors,
                    ...field,
                  }}
                />
              )}
            />
          </div>
          <ButtonWithSpinner
            {...{
              type: 'submit',
              className: 'bg-gray-900 hover:bg-gray-700 text-white w-full',
              spinner: loading,
            }}
          >
            Save Changes
          </ButtonWithSpinner>
        </form>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
