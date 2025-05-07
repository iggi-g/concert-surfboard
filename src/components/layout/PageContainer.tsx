
interface PageContainerProps {
  children: React.ReactNode;
}

export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <div className="relative min-h-screen w-full">
      <div className="relative z-20 pt-4 pb-16 mx-auto text-center flex flex-col min-h-screen w-full px-4 md:px-6 max-w-7xl">
        {children}
      </div>
    </div>
  );
};
