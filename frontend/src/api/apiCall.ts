export const apiCall = ({ fn, setLoading }: { fn: () => void; setLoading: (loading: boolean) => void }) => {
  try {
    setLoading(true);
    const res = fn();
    return res;
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};
