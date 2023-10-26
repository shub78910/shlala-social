export const formatError = (error: any) => {
  return error.response && (error.response.data.message ?? 'Unknown error');
};
