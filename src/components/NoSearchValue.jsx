export const NoSearchValue = ({ param }) => {
  return (
    <>
      <p className="text-[20px]">
        입력하신 검색어 '{param}'(와)과 일치하는 결과가 없습니다.
      </p>
      <p className="text-[20px]">다른 키워드를 입력해 보세요.</p>
    </>
  );
};
