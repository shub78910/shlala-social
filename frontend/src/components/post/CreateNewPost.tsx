import { Controller, useForm } from 'react-hook-form';
import Input from '../formComponents/Input';
import TextArea from '../formComponents/TextArea';
import { MdOutlineCancel } from 'react-icons/md';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import When from '../When';
import { uploadImage } from '@/utils/uploadImage';
import { useMutation } from '@tanstack/react-query';
import { postDataAPI } from '@/utils/axiosCall';
import ButtonWithSpinner from '../formComponents/ButtonWithSpinner';
import { ImageUploadResponse } from '@/Interface';
import ImageUploader from '../ImageUploader';
import Modal from '../Modal';

interface ISubmitData {
  caption: string;
  media: any;
}

const CreateNewPost = ({ setModalOpen }: { setModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [imageSrc, setImageSrc] = useState<string>(); // only for preview
  const [images, setImages] = useState<any>([]); // to send to uploadImage func

  const [loading, setLoading] = useState<boolean>(false);

  const mutation = useMutation(({ caption, image }: { caption: string; image: string }) => {
    return postDataAPI('post', { caption, image });
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        caption: yup.string().required('Caption is required'),
        media: yup
          .mixed()
          // .test('fileSize', 'File size is too large', (value: any) => {

          //   return value && value[0].size <= 1024000; // 1 MB
          // })
          // .test('fileFormat', 'Unsupported file format', (value: any) => {
          //   return value && value[0].type.startsWith('image/');
          // })
          .required('Please upload an image'),
      }),
    ),
  });

  const closeModal = () => {
    setModalOpen(false);
  };

  const onSubmit = async (data: ISubmitData) => {
    setLoading(true);
    const res: ImageUploadResponse = await uploadImage(images[0]);

    await mutation.mutateAsync({ caption: data.caption, image: res.url });
    setLoading(false);

    closeModal();
  };

  return (
    <Modal>
      <div className="flex justify-end cursor-pointer" onClick={() => closeModal()}>
        <MdOutlineCancel size={20} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="caption" className="text-lg font-medium">
            Caption
          </label>
          <Controller
            name="caption"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextArea
                {...field}
                placeholder="Write your caption..."
                errors={errors}
                name="caption"
                {...{
                  className: 'w-full mt-4 p-1 outline-none',
                }}
              />
            )}
          />
        </div>
        <ImageUploader
          {...{
            control,
            errors,
            setImages,
            setImageSrc,
            images,
            showLabel: true,
            label: 'Upload Image',
          }}
        />
        <When isTrue={!!imageSrc}>
          <div className="mb-5">
            <Image alt="preview" src={imageSrc ?? ''} width={150} height={100} className="object-fill" />
          </div>
        </When>
        <ButtonWithSpinner
          spinner={loading}
          className="bg-gray-900 hover:bg-gray-700 text-white p-4 rounded-md font-medium w-full"
          {...{
            type: 'submit',
            disabled: loading,
          }}
        >
          Create Post
        </ButtonWithSpinner>
      </form>
    </Modal>
  );
};
export default CreateNewPost;
