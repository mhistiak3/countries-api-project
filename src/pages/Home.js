import { useEffect, useState } from "react";
import Card from "../components/Card";
import TopBar from "../components/TopBar";
import classes from "../styles/Home.module.css";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [filterCountries, setFilterCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleData, setVisible] = useState(8);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://restcountries.com/v2/all");
        const data = await response.json();
        setCountries(data);
        setFilterCountries(data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCountries();
  }, []);
  const loadMore = () => {
    setVisible(visibleData + 4);
  };
  // Select By Region
  const handleSelect = async (e) => {
    if (e.target.value === "All") {
      setFilterCountries(countries);
    } else {
      setLoading(true);
      const response = await fetch(
        `https://restcountries.com/v2/region/${e.target.value}`
      );
      const data = await response.json();
      setFilterCountries(data);
      setLoading(false);
    }
  };
  // Search Country
  const searchCountry = (searchTerm) => {
    if (searchTerm === "") {
      setFilterCountries(countries);
    } else {
      const filterList = countries.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilterCountries(filterList);
    }
  };
  return (
    <div className={classes.home}>
      <div className="container">
        <TopBar handleSelect={handleSelect} searchCountry={searchCountry} />
        <div className={classes.cards}>
          {loading ? (
            ""
          ) : filterCountries.length > 0 ? (
            filterCountries
              .slice(0, visibleData)
              .map((country, index) => <Card country={country} key={index} />)
          ) : (
            <h3>No Country Found</h3>
          )}
        </div>
        <div className={classes.loadMore}>
          <button className={classes.btn} onClick={loadMore} disabled={loading}>
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
        {loading ? <div className="spacer"></div> : ""}
      </div>
    </div>
  );
};

export default Home;
