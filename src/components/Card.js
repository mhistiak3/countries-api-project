import classes from "../styles/Home.module.css";
import { Link } from "react-router-dom";
const Card = ({ country }) => {
  function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
    return x;
  }
  return (
    <div className={classes.card}>
      <div className={classes.imgTop}>
        <Link to={country.name}>
          <img src={country.flags.png} alt="" />
        </Link>
      </div>
      <div className={classes.textBottom}>
        <span>{country.nativeName}</span>
        <h3>{country.name}</h3>
        <h4>
          Population: <span>{numberWithCommas(country.population)}</span>
        </h4>
        <h4>
          Region: <span>{country.region}</span>
        </h4>
        <h4>
          Capital: <span>{country.capital}</span>
        </h4>
      </div>
    </div>
  );
};

export default Card;
