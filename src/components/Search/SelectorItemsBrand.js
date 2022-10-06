import { SearchContext } from "../../context/SearchContext";
import { useContext } from "react";

const SelectorItemsBrand = ({ name }) => {
  let { brands } = useContext(SearchContext);
  brands = brands != null && brands.length > 5 ? brands.slice(0, 6) : brands;

  return (
    <div className={`selector-bar__item search-selector-bar__item--${name}`}>
      {brands != null
        ? [...Object.keys(brands)].map((key) => (
            <div
              key={key}
              className={`search-bar-input__option search-bar-input__option--${name}`}
              value={key}
              dataCy={`${name}InputOptionSearch`}
            >
              {brands[key].name}
            </div>
          ))
        : null}
    </div>
  );
};

export default SelectorItemsBrand;
