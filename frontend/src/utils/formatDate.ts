import { format, formatDistanceToNow } from 'date-fns';

const formatDate = (mongoDBDateString: string) => {
  const date = new Date(mongoDBDateString);

  const formattedDate = formatDistanceToNow(date, { addSuffix: true });

  const time = format(date, 'h:mm a');

  return `${formattedDate} at ${time}`;
};

export default formatDate;
