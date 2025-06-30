import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMAGE_BASE_URL } from "../constant/imageBaseUrl";
import { PEOPLE_COLORS, VERTICAL_TEXTS } from "../constant/verticalText";
export const TrendingPeople = ({ trendingPeopleList, onImageLoad }) => {
  // const [isLoaded, setIsLoaded] = useState(false);
  const [isNarrow, setIsNarrow] = useState(window.innerWidth <= 1510);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth <= 1280);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const navigate = useNavigate();

  const randomPeople = useMemo(() => {
    const filtered = trendingPeopleList
      .map((person) => {
        const movieKnownFor = person.known_for?.filter(
          (item) => item.media_type === "movie" && item.poster_path !== null
        );

        if (movieKnownFor && movieKnownFor.length > 0) {
          return {
            ...person,
            known_for: movieKnownFor,
          };
        }
        return null;
      })
      .filter(Boolean);

    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, [trendingPeopleList]);

  const handleToSisunzip = (name) => {
    window.scrollTo({ top: 0, behavior: "auto" });
    navigate(`/sisunzip?query=${name}`);
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsNarrow(width <= 1510);
      setIsDesktop(width <= 1024);
      setIsMobile(width <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const verticalTexts = isNarrow
    ? ["이 사람을 향한 시선", "관객의 눈"]
    : VERTICAL_TEXTS;

  return (
    <div className="grid gap-[20px] people-area">
      {randomPeople.slice(0, 3).map((el, i) => (
        <div
          key={el.id}
          className="people-box cursor-pointer"
          onClick={() => handleToSisunzip(el.name)}
        >
          <div className="movie-poster">
            {/* {!isLoaded && <p>🖼️ 이미지 로딩 중...</p>} */}
            <img
              src={`${IMAGE_BASE_URL.poster}${el.profile_path}`}
              alt={el.name}
              onLoad={onImageLoad}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
              }}
              // style={{
              //   visibility: isLoaded ? "visible" : "hidden",
              // }}
            />
            <img
              src={`../../public/images/img_best_artist_item${i + 1}.png`}
              alt=""
              className="absolute bottom-[10px] right-[10px] w-[50px] h-[50px] z-[2]"
            />
            <div className="flex gap-[10px] absolute left-[10px] top-[10px] z-[2]">
              {!isDesktop && (
                <div
                  className={`flex flex-col gap-[10px] items-center`}
                  style={{ color: PEOPLE_COLORS[i] }}
                >
                  {verticalTexts.map((text, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center gap-[3px] "
                    >
                      <span className="item-text flex flex-col flex-wrap items-center">
                        {text.split("").map((char, cIdx) => (
                          <span
                            key={cIdx}
                            className="vertical-text rotate-90 text-[16px] max-[1700px]:text-[0.75rem] max-[1024px]:text-[0.75rem]"
                          >
                            {char === " " ? "\u00A0" : char}
                          </span>
                        ))}
                      </span>

                      {idx < verticalTexts.length - 1 && (
                        <div
                          className="w-[0.7rem] h-[1px] mt-[3px]"
                          style={{ backgroundColor: PEOPLE_COLORS[i] }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {!isMobile && (
                <span className="flex flex-col items-center">
                  {el.name.split("").map((char, idx) => (
                    <span
                      key={idx}
                      className={`leading-[18px] `}
                      style={{ color: PEOPLE_COLORS[i] }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
