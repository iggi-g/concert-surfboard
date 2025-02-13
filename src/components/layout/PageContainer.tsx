interface PageContainerProps {
  children: React.ReactNode;
}
export const PageContainer = ({
  children
}: PageContainerProps) => {
  return <div className="relative min-h-screen w-full">
      <div className="relative z-20 mx-auto text-center flex flex-col min-h-screen w-full px-4 md:px-0 py-0">
        {children}
      </div>
    </div>;
};