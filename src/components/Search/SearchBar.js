import SelectorItemsBrand from "./SelectorItemsBrand";
import SelectorItemsFuel from "./SelectorItemsFuel";
import SearchInput from "./SearchInput";
import SearchFiltersButton from "./SearchFiltersButton";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import { FaCar, FaGasPump } from "react-icons/fa";

const SearchBar = () => {
  let { getDataFiltered } = useContext(SearchContext);

  return (
    <form className="search-bar" onSubmit={getDataFiltered}>
      <SearchInput
        name={"brand"}
        placeholder={"¿Qué marca buscas?"}
        icon={<FaCar />}
        selector={<SelectorItemsBrand name="brand" />}
      ></SearchInput>
      <SearchInput
        name={"fuel"}
        placeholder={"Combustible"}
        icon={<FaGasPump />}
        selector={<SelectorItemsFuel name="fuel"  />}
      ></SearchInput>
      <SearchFiltersButton></SearchFiltersButton>
    </form>
  );
};

export default SearchBar;
