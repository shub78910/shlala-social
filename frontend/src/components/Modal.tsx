const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-30  text-white">
      <div className="bg-gray-800 w-1/3 p-4 rounded-lg shadow-lg">{children}</div>
    </div>
  );
};

export default Modal;
