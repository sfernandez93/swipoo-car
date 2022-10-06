import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";

const SearchInput = ({ name, placeholder, selector, icon }) => {
  const { handleChange } = useContext(SearchContext);

  return (
    <div className={`search-bar-input__container search-bar-input__container--${name}`}>
      <div className="search-bar__input">
        <div className="search-bar-input__icon">
          {icon}
        </div>
        <div className="search-bar-input__entry">
          <input
            type="text"
            placeholder={placeholder}
            onChange={handleChange}
            name={name}
            id={name}
            dataCy={`${name}InputSearch`}
          ></input>
        </div>
      </div>
      {selector}
    </div>
  );
};

export default SearchInput;
