import { useState, useEffect } from "react";
import PropTypes from "prop-types"; 
import style from "./GridData.module.css";

export const GridData = ({ searchResult }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (searchResult) {
      setCountries([searchResult]);
    }
  }, [searchResult]);

  return (
    <div className={style.flex_grid_container}>
      <div className={style.content_grid_container}>
        {countries.map((country, index) => (
          <div key={index} className={style.flag_box}>
            <div className={style.box_flag_image}>
              <img src={country.flags.png} alt={`${country.name.common} flag`} />
            </div>
            <div className={style.box_flag_content}>
              <h3>{country.name.common}</h3>
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

GridData.propTypes = {
  searchResult: PropTypes.object, 
};
