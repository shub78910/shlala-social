import { ThreeDots } from 'react-loader-spinner';

const Loader = ({
  height = '100',
  width = '100',
  radius = 1,
  color = '#f8fafc',
}: {
  height?: string;
  width?: string;
  radius?: number;
  color?: string;
}) => {
  return <ThreeDots height={height} width={width} radius={radius} color={color} ariaLabel="three-dots-loading" />;
};

export default Loader;
