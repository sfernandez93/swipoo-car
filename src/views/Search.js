import SearchBackgroundImage from "../components/Search/SearchBackgroundImage";
import SearchBar from "../components/Search/SearchBar";
import SearchTitle from "../components/Search/SearchTitle";
import SearchSubtitle from "../components/Search/SearchSubtitle";
import SearchResult from "../components/Search/SearchResult";
import NavBar from "../components/Comun/NavBar";
import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";

const Search = () => {
  let { dataCars } = useContext(SearchContext);

  return (
    <div>
      <div className="search-bar-container">
        <NavBar />
        <SearchBackgroundImage />
        <div className="content-page-container">
          <SearchTitle />
          <SearchSubtitle />
          <SearchBar />
          <div className="search-result-container">
            {dataCars != null
              ? [...Object.keys(dataCars)].map((key) => (
                // <div><div></div><div></div></div>
                  <SearchResult data={dataCars[key]} />
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Search;
