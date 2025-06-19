export const SkeletonDetail = () => {
  return (
    <section className="max-w-screen-lg h-[calc(100vh-60px)] justify-center text-[#fff] animate-pulse">
      <div className="flex gap-[20px] w-[100%]">
        <div className="pb-[calc((185/350)*100%)] w-[350px] bg-gray-700 rounded-lg" />
        <div className="flex-1 flex flex-col gap-[20px]">
          <div className="flex justify-between">
            <div className="w-[60%] h-[24px] bg-gray-700 rounded" />
            <div className="w-[20%] h-[18px] bg-gray-600 rounded" />
          </div>
          <div className="flex gap-[10px]">
            <div className="w-[50px] h-[18px] bg-gray-600 rounded" />
            <div className="w-[50px] h-[18px] bg-gray-600 rounded" />
          </div>
          <div className="w-full h-[80px] bg-gray-800 rounded" />
        </div>
      </div>
    </section>
  );
};
