export const SkeletonDetail = () => {
  return (
    <section className="movie-detail skeleton">
      <div className="inner">
        <div className="movie-poster" />
        <div className="movie-detail__info">
          <div className="movie-detail__title-box">
            <div className="movie-title" />
            <div className="movie-detail__rating" />
          </div>
          <div className="movie-detail__genres">
            <div className="movie-detail__genre" />
            <div className="movie-detail__genre" />
          </div>
          <div className="movie-detail__overview" />
        </div>
      </div>
    </section>
  );
};
