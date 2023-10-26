import { ThreeDots } from 'react-loader-spinner';

const Loader = ({ height, width, radius, color }: { height: string; width: string; radius: number; color: string }) => {
  return <ThreeDots height={height} width={width} radius={radius} color={color} ariaLabel="three-dots-loading" />;
};

export default Loader;
