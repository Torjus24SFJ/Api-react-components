import { useState, useEffect } from "react";
import style from "./SearchData.module.css";

export const SearchData = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [names, setNames] = useState([]);

  useEffect(() => {
    if (searchTerm === "") {
      setNames([]);
      return;
    }

    const fetchNames = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${searchTerm}`
        );
        if (!response.ok) throw new Error("Country not found");

        const data = await response.json();
        setNames(data);
      } catch (error) {
        console.log("Error fetching names:", error);
        setNames([]);
      }
    };

    fetchNames();
  }, [searchTerm]);

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
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul className={style.search_results}>
        {names.slice(0, 10).map((country) => (
          <li key={country.cca2}>{country.name.common}</li>
        ))}
      </ul>
    </div>
  );
};
