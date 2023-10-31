import { formatDistanceToNow } from 'date-fns';

const formatDate = (mongoDBDateString: string) => {
  const date = new Date(mongoDBDateString);

  const formattedDate = formatDistanceToNow(date, { addSuffix: true });

  return formattedDate;
};

export default formatDate;
