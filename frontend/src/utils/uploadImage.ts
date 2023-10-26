export const uploadImage = async (image: any) => {
  // TODO: CHECK IF SOMETHING CAN BE ADDED TO ENV
  const formData = new FormData();

  formData.append('file', image);

  formData.append('upload_preset', 'shlala-uploads');
  formData.append('cloud_name', 'shlala-uploads');
  const res = await fetch('https://api.cloudinary.com/v1_1/shlala-uploads/image/upload', {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();

  return { url: data.secure_url };
};
