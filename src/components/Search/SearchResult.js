const SearchResult = ({ data }) => {
  return (
    <div className="search-result-container__item">
      <div className="search-result-container__photo"></div>
      <div className="search-result-container__info">
        <div>{data.model}</div>
        <div>{data.fuel}</div>
        <div>{data.date.slice(0, 4)}</div>
        <div className="search-result-buttom">Ver oferta</div>
      </div>
    </div>
  );
};
export default SearchResult;
