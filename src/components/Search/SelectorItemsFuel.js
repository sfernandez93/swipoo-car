import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";

const SelectorItemsFuel = ({ name }) => {
  let { fuelTypes } = useContext(SearchContext);
  fuelTypes = fuelTypes != null && fuelTypes.length > 5 ? fuelTypes.slice(0,6): fuelTypes;

  return (
    <div className={`selector-bar__item search-selector-bar__item--${name}`}>
      {fuelTypes != null
        ? [...Object.keys(fuelTypes)].map((key) => (
            <div key={key} className={`search-bar-input__option search-bar-input__option--${name}`} value={key}>
              {fuelTypes[key].name}
            </div>
          ))
        : null}
    </div>
  );
};

export default SelectorItemsFuel;
