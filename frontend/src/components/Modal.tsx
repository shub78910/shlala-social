const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center text-white">
      <div className="bg-gray-800 w-full md:w-1/3 p-4 rounded-lg shadow-lg m-2">{children}</div>
    </div>
  );
};

export default Modal;
