// export const SkeletonDetail = () => {
//   return (
//     <section className="movie-detail skeleton">
//       <div className="inner">
//         <div className="movie-poster" />
//         <div className="movie-detail__info">
//           <div className="movie-detail__title-box">
//             <div className="movie-title" />
//             <div className="movie-detail__rating" />
//           </div>
//           <div className="movie-detail__genres">
//             <div className="movie-detail__genre" />
//             <div className="movie-detail__genre" />
//           </div>
//           <div className="movie-detail__overview" />
//         </div>
//       </div>
//     </section>
//   );
// };

export const SkeletonDetail = () => {
  return (
    <section className="movie-detail skeleton h-[40rem]">
      <div className="inner h-full">
        <div className="movie-detail__visual-box h-full">
          <div className="movie-detail__poster-box">
            <div className="movie-poster bg-[#334155] relative w-[20%] pb-[30%]">
              {/* 포스터 스켈레톤 */}
            </div>

            <div className="movie-detail__info flex flex-col flex-1 gap-[30px] text-white">
              <div className="movie-detail__title-box flex justify-between">
                <div className="movie-title bg-[#374151]" />
                <div className="movie-detail__rating bg-[#475569]" />
              </div>
              <div className="movie-detail__meta flex gap-[3px]">
                <div className="movie-release bg-[#475569]" />
                <div className="movie-detail__runtime bg-[#475569]" />
                <div className="movie-detail__genres bg-[#475569]">
                  <div className="movie-detail__genre"></div>
                  <div className="movie-detail__genre"></div>
                  <div className="movie-detail__genre"></div>
                </div>
              </div>
              <div className="movie-detail__overview bg-[#1e293b]" />
            </div>
          </div>

          <div className="movie-poster__backdrop bg-[#1e293b] w-[50%] h-full" />
        </div>
      </div>
    </section>
  );
};
