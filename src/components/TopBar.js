import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import classes from "../styles/Home.module.css";

const TopBar = ({ handleSelect, searchCountry }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    searchCountry(searchTerm);
  };
  return (
    <div className={classes.topBar}>
      <form className={classes.searchBar} onSubmit={(e) => handleSubmit(e)}>
        <AiOutlineSearch className={classes.serarchIcon} />
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      <select className={classes.my_class} onChange={(e) => handleSelect(e)}>
        <option value="All">Select By Region</option>
        <option value="asia">Asia</option>
        <option value="europe">Europe</option>
        <option value="africa">Arica</option>
        <option value="oceania">Oceania</option>
        <option value="Americas">Americas</option>
        <option value="polar">Polar</option>
      </select>
    </div>
  );
};

export default TopBar;
