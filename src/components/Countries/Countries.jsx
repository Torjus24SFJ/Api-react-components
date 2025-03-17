import { useState } from "react";
import style from "./Countries.module.css";
import { GridData } from "../GridData/GridData";
import { SearchData } from "../SearchData/SearchData";

export function Countries() {
  const [searchResult, setSearchResult] = useState(null)

  const handleSearchResult = (country) => {
    setSearchResult(country)
  }
  return (
    <section
      className={style.section_flags_page}
    >
      <div
        className={style.header_container}
      >
        <div className={style.header_text}>
          <h1>Where in the world?</h1>
          <span className={style.header_dark_mode_switch}>
          
          </span>
        </div>
      </div>
      <SearchData onSearch={handleSearchResult} />
      <GridData searchResult={searchResult} />
    </section>
  );
}
