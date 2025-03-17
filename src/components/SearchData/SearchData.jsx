import { useState } from "react";
import PropTypes from "prop-types"; 
import style from "./SearchData.module.css";

export const SearchData = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [names, setNames] = useState([]);

  const handleSearchChange = async (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setNames([]);
      return;
    }

    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${e.target.value}`
      );
      const data = await response.json();
      setNames(data);
    } catch (error) {
      console.log("Error fetching names:", error);
      setNames([]);
    }
  };

  const handleSearchSubmit = (country) => {
    onSearch(country);
    setSearchTerm(country.name.common);  
    setNames([]);
  };

  return (
    <div className={style.search_container}>
      <div className={style.search_field}>
        <button type="submit" className={style.searchButton}>
          <svg
            className="feather feather-search"
            fill="none"
            height="24"
            stroke="currentColor"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" x2="16.65" y1="21" y2="16.65" />
          </svg>
        </button>
        <input
          type="text"
          className={style.searchCountry}
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {names.length > 0 && (
        <ul className={style.search_results}>
          {names.map((country) => (
            <li key={country.cca2} onClick={() => handleSearchSubmit(country)}>
              {country.name.common}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

SearchData.propTypes = {
  onSearch: PropTypes.func.isRequired, 
};
