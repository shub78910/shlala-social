import axios from 'axios';

let token: string | null = null;
if (typeof window !== 'undefined') {
  token = localStorage.getItem('token');
}
console.log({ token });

const baseURL = 'http://localhost:5000';

export const getDataAPI = async (url: string) => {
  return await axios.get(`${baseURL}/api/${url}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const postDataAPI = async (url: string, data: any) => {
  return await axios.post(`${baseURL}/api/${url}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const patchDataAPI = async (url: string, data: any) => {
  return await axios.patch(`${baseURL}/api/${url}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteDataAPI = async (url: string) => {
  return await axios.delete(`${baseURL}/api/${url}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
