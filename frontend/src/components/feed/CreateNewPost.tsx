import { Controller, useForm } from 'react-hook-form';
import Input from '../formComponents/Input';
import TextArea from '../formComponents/TextArea';
import Button from '../formComponents/Button';
import { MdOutlineCancel } from 'react-icons/md';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import Image from 'next/image';
import When from '../When';
import { uploadImage } from '@/utils/uploadImage';
import { useMutation } from '@tanstack/react-query';
import { postDataAPI } from '@/utils/axiosCall';

const CreateNewPost = ({ setModalOpen }: { setModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const [images, setImages] = useState<any>([]);

  const mutation = useMutation(({ caption, image }: { caption: string; image: string }) => {
    return postDataAPI('post', { caption, image });
  });

  console.log({ mutation });

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
          // .test('fileSize', 'File size is too large', (value) => {
          //   return value && value[0].size <= 1024000; // 1 MB
          // })
          // .test('fileFormat', 'Unsupported file format', (value) => {
          //   return value && value[0].type.startsWith('image/');
          // })
          .required('Please upload an image'),
      }),
    ),
  });

  const onSubmit = async (data: any) => {
    console.log({ images, data });
    const res = await uploadImage(images[0]);

    console.log({ res });

    // Handle form submission logic here
    // You can send the data to your server or Redux store

    mutation.mutate({ caption: data.caption, image: res.url });
    closeModal();
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleOnChange = (changeEvent: any) => {
    const files = [...changeEvent.target.files];
    let newImages: any = [];

    files.forEach((file) => {
      return newImages.push(file);
    });

    setImages([...images, ...newImages]);

    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      // @ts-ignore
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-30  text-white">
      <div className="bg-gray-800 w-1/3 p-4 rounded-lg shadow-lg">
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
          <div className="mb-4">
            <label htmlFor="media" className="text-lg font-medium">
              Add Image
            </label>
            <Controller
              name="media"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  className="border"
                  errors={errors}
                  {...{
                    type: 'file',
                    name: 'media',
                    accept: 'image/*',
                    onChange: (e: any) => handleOnChange(e),
                  }}
                />
              )}
            />
          </div>
          <When isTrue={!!imageSrc}>
            <div className="mb-5">
              <Image alt="preview" src={imageSrc ?? ''} width={150} height={100} className="object-fill" />
            </div>
          </When>
          <Button
            className="bg-gray-900 hover:bg-gray-700 text-white py-2 px-4 rounded-md font-medium"
            {...{
              type: 'submit',
            }}
          >
            Create Post
          </Button>
        </form>
      </div>
    </div>
  );
};
export default CreateNewPost;
