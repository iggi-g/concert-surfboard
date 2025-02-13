
interface PageContainerProps {
  children: React.ReactNode;
}
export const PageContainer = ({
  children
}: PageContainerProps) => {
  return <div className="relative min-h-screen w-full">
      <div className="relative z-20 mx-auto text-center flex flex-col min-h-screen w-full px-6 md:px-12 lg:px-24 py-8 md:py-12">
        {children}
      </div>
    </div>;
};
