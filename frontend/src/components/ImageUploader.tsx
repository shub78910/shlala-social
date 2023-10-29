import React, { useState } from 'react';
import When from './When';
import Button from './formComponents/Button';
import { Controller } from 'react-hook-form';

import Input from './formComponents/Input';

const ImageUploader = ({
  control,
  errors,
  setImages,
  setImageSrc,
  images,
  showLabel = true,
  label = 'Upload Image',
}: {
  control: any;
  errors: any;
  setImages: any;
  setImageSrc: any;
  images: any;
  showLabel?: boolean;
  label?: string;
}) => {
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
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  };

  return (
    <div className="relative w-1/4 h-1/4 rounded-full">
      <div className="mb-4">
        <When isTrue={showLabel}>
          <label htmlFor="media" className="text-lg font-medium">
            {label}
          </label>
        </When>
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
    </div>
  );
};

export default ImageUploader;
