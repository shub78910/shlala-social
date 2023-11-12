import { AxiosPromise } from 'axios';

export const apiCall = async ({ fn, setLoading }: { fn: any; setLoading: (loading: boolean) => void }) => {
  try {
    setLoading(true);

    const res = await fn();
    return res;
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};
