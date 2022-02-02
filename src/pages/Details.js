import { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import classes from "../styles/Details.module.css";
import countries from "i18n-iso-countries";
const Details = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState([]);
  const [error, setError] = useState(false);
  countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://restcountries.com/v2/name" + location.pathname
        );
        const data = await response.json();
        if (data.status === 404) {
          setCountry([]);
          setLoading(false);
          setError(true);
        } else {
          setCountry(data);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setCountry([]);
        setLoading(false);
        setError(true);
      }
    };

    fetchCountry();
  }, [location.pathname]);
  function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
    return x;
  }

  return (
    <div className={classes.detailsPage}>
      <div className="container">
        <Link to="/">
          <button className={classes.btn}>
            <BsArrowLeft /> <span>Back</span>
          </button>
        </Link>
        {loading ? (
          <h1 className={classes.alertMessage}>Loading...</h1>
        ) : !error ? (
          country.length > 0 ? (
            <>
              <div className={classes.countryDetails}>
                <div className={classes.countryImg}>
                  <img src={country[0]?.flags.svg} alt="" />
                </div>
                <div className={classes.countryInfo}>
                  <h2>{country[0]?.name}</h2>
                  <div className={classes.shotDetails}>
                    <h4>
                      Native Name: <span>{country[0]?.nativeName}</span>
                    </h4>
                    <h4>
                      Top Level Domain:
                      <span> {country[0]?.topLevelDomain[0]}</span>
                    </h4>
                    <h4>
                      Population:
                      <span> {numberWithCommas(country[0]?.population)}</span>
                    </h4>
                    <h4>
                      Currencies: <span>{country[0]?.currencies[0]?.name}</span>
                    </h4>
                    <h4>
                      Currency Symbol:{" "}
                      <span> {country[0]?.currencies[0]?.symbol}</span>
                    </h4>
                    <h4>
                      Languages:{" "}
                      <span>
                        {country[0].languages.map((lan) => lan.name + ", ")}
                      </span>
                    </h4>
                    <h4>
                      Region: <span>{country[0]?.region}</span>
                    </h4>
                    <h4>
                      Subregion: <span>{country[0]?.subregion}</span>
                    </h4>

                    <h4>
                      Capital: <span>{country[0]?.capital}</span>
                    </h4>
                    <h4>
                      Area: <span>{numberWithCommas(country[0]?.area)}</span>
                    </h4>
                  </div>
                  <div className={classes.borders}>
                    <span> Border Countries:</span>
                    {country[0]?.borders?.map((border, key) => (
                      <Link
                        to={"/" + countries.getName(border, "en")}
                        key={key}
                        className={classes.borderCountry}
                      >
                        {countries.getName(border, "en")}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )
        ) : (
          <h1 className={classes.alertMessage}>Page Not Found</h1>
        )}
      </div>
    </div>
  );
};

export default Details;
