import classes from "../styles/Navbar.module.css";
import { FaMoon } from "react-icons/fa";
import { useEffect, useState } from "react";
import LOGO from '../logo.png'
const Navbar = () => {
    const [darkTheme,setDarkTheme]=useState(true)
    useEffect(()=>{
  if (darkTheme) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
    },[darkTheme])
  return (
    <nav className={classes.navbar}>
      <div className={`${classes.navContainer} container`}>
        <div className={classes.logo}>
          <img src={LOGO} alt="" />
          <h2>iA QC</h2>
        </div>
        <div
          onClick={() => setDarkTheme(!darkTheme)}
          className={classes.themeSwitch}
        >
          <FaMoon />
          <span>Dark Mode</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
