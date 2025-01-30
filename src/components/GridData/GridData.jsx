import { useState, useEffect } from "react";
import style from "./GridData.module.css";

export const GridData = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchFlags = async () => {
      try {
        const response = await fetch("https://restcountries.com/v2/all");
        const countries = await response.json();
        setCountries(countries.slice(0, 16));
      } catch (error) {
        console.log("Error fetching flags:", error);
      }
    };

    fetchFlags();
  }, []);

  return (
    <div className={style.flex_grid_container}>
      <div className={style.content_grid_container}>
        {countries.map((country, index) => (
          <div key={index} className={style.flag_box}>
            <div className={style.box_flag_image}>
              <img src={country.flags.png} alt={`${country.name} flag`} />
            </div>
            <div className={style.box_flag_content}>
              <h3>{country.name}</h3>
              <p><span>Population:</span> {country.population.toLocaleString()}</p>
              <p><span>Region:</span> {country.region}</p>
              <p><span>Capital:</span> {country.capital}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};