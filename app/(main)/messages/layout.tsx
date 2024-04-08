const MessagesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex bg-blue-500 h-[calc(100vh-81px)] w-full]">
      <div className="bg-green-500 w-1/3 h-full"></div>
      {children}
    </div>
  );
};

export default MessagesLayout;
