const When = ({ isTrue, children }: { isTrue: boolean; children: React.ReactNode }) => {
  if (!isTrue) {
    return null;
  }

  return <>{children}</>;
};

export default When;
