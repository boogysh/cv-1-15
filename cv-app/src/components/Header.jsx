import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import html from "../assets/pr-dev/html.png";
import css from "../assets/pr-dev/css.png";
import js from "../assets/pr-dev/js.png";
import react from "../assets/pr-dev/react.png";
import node from "../assets/pr-dev/node.png";
import balise_ouvr from "../assets/pr-dev/balise-ouvr.png";
import balise_ferm from "../assets/pr-dev/balise-ferm.png";
import HeaderContact from "./HeaderContact.jsx";
import HeaderBurger from "./header-burger/HeaderBurger";
import LangSelect from "./langSelect";
import { useSelector } from "react-redux";

function Header() {
  const { t } = useSelector((state) => state.langReducer);
  const activeLink =
    "block decoration-none ml-0 py-2 uppercase text-[14px] md:text-base md:py-4 md:ml-5 font-medium after:content-[''] after:block after:w-[0%]  hover:after:w-[100%] after:h-[1px] after:bg-black transition-all after:mx-auto after:duration-500 ease-in-out  after:w-[100%] ";
  const normalLink =
    "block decoration-none ml-0 py-2 uppercase text-[14px] md:text-base md:py-4 md:ml-5 font-medium after:content-[''] after:block   hover:after:w-[100%] after:h-[1px] after:bg-black transition-all after:mx-auto after:duration-500 ease-in-out   after:w-[0%] ";

  const [isOpen, setIsOpen] = useState(false);
  const [isAnimated, setAnimated] = useState(false);
  const [isBG, setBG] = useState({
    arch: false,
    bat: false,
    dev: false,
  });
  const [isTitle, setTitle] = useState({
    arch: false,
    bat: false,
    dev: false,
  });

  const addBgAndTitleArch = () => {
    setBG({ arch: true });
    setTitle({ arch: true });
  };
  const addBgAndTitleBat = () => {
    setBG({ bat: true });
    setTitle({ bat: true });
  };
  const addBgAndTitleDev = () => {
    setBG({ dev: true });
    setTitle({ dev: true });
  };
  const removeAllBgAndTitles = () => {
    setBG(false);
    setTitle(false);
  };
  const toggleNav = () => {
    setIsOpen(!isOpen);
    setAnimated(!isAnimated);
  };

  //---------scroll limit-----------------

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 200px)").matches
  );
  const [matches_xs, setMatches_xs] = useState(
    window.matchMedia("(min-width: 481px) and (max-width:767px)").matches
  );
  const [matches_md, setmatches_md] = useState(
    window.matchMedia("(min-width: 768px) ").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 200px) and (max-width:480px)")
      .addEventListener("change", (e) => setMatches(e.matches));
    window
      .matchMedia("(min-width: 481px) and (max-width:767px)")
      .addEventListener("change", (e) => setMatches_xs(e.matches_xs));
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setmatches_md(e.matches_md));
  }, []);

  const scrollFunction = () => {
    const element = document.querySelector("#navBar");
    const scroll = document.documentElement.scrollTop > 430;
    const scroll_xs = document.documentElement.scrollTop > 520;
    const scroll_md = document.documentElement.scrollTop > 220;
    if (matches && scroll) {
      element && element.classList.add("fixed-top", "pt-fixed");
    } else if (matches_xs && scroll_xs) {
      element && element.classList.add("fixed-top", "pt-fixed");
    } else if (matches_md && scroll_md) {
      element && element.classList.add("fixed-top", "pt-fixed");
    } else {
      element && element.classList.remove("fixed-top", "pt-fixed");
    }
  };
  window.onload = scrollFunction;
  window.onscroll = scrollFunction;

  //----------
  const style = {
    container:
      "flex flex-col items-center  md:flex-row justify-around w-full h-auto  pt-[10px] px-[10px]",
    item: "relative overflow-hidden flex flex-col justify-center items-center bg-cover h-[130px] xs:h-[160px] md:h-[200px] mb-[10px] w-full md:w-[32.5%]  md:rounded-[5px] shadow",
    footer:
      "absolute bottom-0 w-full h-10 md:h-14 flex items-center justify-center text-[24px] text-white bg-gradient-to-b from-[#00000003] to-[#000000cc] z-10",
    title:
      "absolute top-[3%] xs:top-[4%] text-[#f1f1f1] text-shadow text-[36px] md:text-[32px]  lg:text-[40px] font-dancing font-light",
    navBar:
      "w-full h-auto py-[10px] px-0 flex flex-col justify-center ml-0 md:pl-[1.5%] md:pr-[1.5%] md:py-[5px] md:flex-row items-center md:justify-between border border-solid border-y-gray-500 bg-[#e0d1d1] z-50",
    fixed: "fixed top-0 pt-[46px] xs:pt-[53px] md:pt-[60px]",
    logo: "w-7 h-7 xs:w-9 xs:h-9 lg:w-10 lg:h-10 mx-2 md:mx-1 lg:mx-2",
  };
  //-----------

  return (
    <div className="flex flex-col items-center justify-center w-full h-auto bg-[--bg_body] transition duration-500 ease-in-out">
      {/* ----------------------- */}

      <div className={style.container}>
        <div className={`${style.item} bg-arch bg-cover bg-center`}>
          <Link
            className="absolute w-full h-full z-20"
            onClick={addBgAndTitleArch}
            // to="/architecture"
            to={`/${t.locale}/${t.archNav}`}
          ></Link>
          {isBG.arch && (
            <div
              id="bg_arch_hover"
              className="absolute w-full h-full bg-black/50"
            ></div>
          )}
          {isTitle.arch && <h3 className={style.title}>{t.archTitle}</h3>}
          <h4 className={style.footer}>2004 - 2011</h4>
        </div>
        <div className={`${style.item} bg-bat bg-cover bg-center`}>
          <Link
            className="absolute w-full h-full z-20"
            onClick={addBgAndTitleBat}
            // to="/batiment"
            to={`/${t.locale}/${t.batNav}`}
          ></Link>
          {isBG.bat && (
            <div
              id="bg_bat_hover"
              className="absolute w-full h-full bg-black/50"
            ></div>
          )}
          {isTitle.bat && <h3 className={style.title}>{t.batTitle}</h3>}
          <h4 className={style.footer}>2011 - 2022...</h4>
        </div>
        <div className={`${style.item}  bg_dev bg-cover bg-center`}>
          <Link
            className="absolute w-full h-full z-20"
            onClick={addBgAndTitleDev}
            // to="/developpement"
            to={`/${t.locale}/${t.devNav}`}
          ></Link>
          {isBG.dev && (
            <div
              id="bg_dev_hover"
              className="absolute w-full h-full bg-black/50"
            ></div>
          )}

          {isTitle.dev && <h3 className={style.title}>{t.devTitle}</h3>}
          <div className="absolute top-[44%]  flex justify-center w-[60%] xxs:w-[50%] md:w-[80%] h-[50px];">
            <img className={style.logo} src={html} alt="html" />
            <img className={style.logo} src={css} alt="css" />
            <img className={style.logo} src={js} alt="js" />
            <img className={style.logo} src={react} alt="react" />
            <img className={style.logo} src={node} alt="node" />
          </div>
          <div className={style.footer}>
            <img
              className="w-[30px] h-auto"
              src={balise_ouvr}
              alt="balise ouvrante"
            />
            <h4 className="w-fit px-4">2022... </h4>
            <img
              className="w-[30px] h-auto"
              src={balise_ferm}
              alt="balise fermante"
            />
          </div>
        </div>
      </div>
      {/* ---------------------------------- */}
      <div id="navBar" className={`${style.navBar} scroll`}>
        <div className="w-[95%] md:w-full flex items-center justify-between">
          <div className="flex justify-center items-center">
            <h3 className="font-dancing text-[26px] pr-4 hidden xxs:block">
              Buga Victor
            </h3>
            <LangSelect />
            <HeaderContact />
          </div>
          <HeaderBurger toggle={toggleNav} isAnimated={isAnimated} />
        </div>
        <nav
          className={`${
            isOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row items-center pt-5 md:pt-0 h-auto`}
        >
          {/* <NavLink
            onClick={removeAllBgAndTitles}
            id="test"
            to="/test"
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            Test
          </NavLink> */}
          <NavLink
            onClick={removeAllBgAndTitles}
            id="cv"
            to="/"
            // to={t.homeNav}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            CV
          </NavLink>
          <NavLink
            onClick={addBgAndTitleArch}
            id="architecture"
            // to="/architecture"
            to={`/${t.locale}/${t.archNav}`}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            {t.archTitle}
          </NavLink>
          <NavLink
            onClick={addBgAndTitleBat}
            id="batiment"
            // to="/batiment"
            to={`/${t.locale}/${t.batNav}`}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            {t.batTitle}
          </NavLink>
          <NavLink
            onClick={addBgAndTitleDev}
            id="developpement"
            // to="/developpement"
            to={`/${t.locale}/${t.devNav}`}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            {t.devTitleNav}
          </NavLink>
        </nav>
      </div>
      {/* //------------------------------------------------------------- */}
    </div>
  );
}
export default Header;
