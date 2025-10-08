import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

import HeaderContact from "./HeaderContact.jsx";
import ButtonContactMe from "./ButtonContactMe.jsx";
import HeaderBurger from "./header-burger/HeaderBurger";
import LangSelect from "./langSelect";
import { useSelector } from "react-redux";
import logo from "../assets/logo-boogysh-construction-2-70.png";
// import Header3ImagesBgLoading from "./Header_3_Images_bg_loading.jsx";

function Header() {
  const { t } = useSelector((state) => state.langReducer);
  const hrefArch = window.location.href.includes(t.archNav);
  const hrefBat = window.location.href.includes(t.batNav);
  const hrefServices = window.location.href.includes(t.servicesNav);
  //
  const FR = t.batNav === "batiment";
  //
  const activeLink =
    "block decoration-none ml-0  py-2 md:py-0 uppercase text-[14px] md:text-[16px] lg:text-[18px] md:text-base   md:ml-5 font-medium after:content-[''] after:block after:w-[0%]  hover:after:w-[100%] after:h-[1px] after:bg-black transition-all after:mx-auto after:duration-500 ease-in-out  after:w-[100%] ";
  const normalLink =
    "block decoration-none ml-0 py-2 md:py-0  uppercase text-[12px] md:text-[12px] lg:text-[14px]   md:ml-5 font-medium after:content-[''] after:block   hover:after:w-[100%] after:h-[1px] after:bg-black transition-all after:mx-auto after:duration-500 ease-in-out   after:w-[0%] ";

  // const [showServices, setShowServices] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const [isAnimated, setAnimated] = useState(false);
  const [isBG, setBG] = useState({
    arch: true,
    bat: false,
    services: false,
  });

  const addBgArch = () => {
    setBG({ arch: true });
  };
  const addBgBat = () => {
    setBG({ bat: true });
  };
  const addBgServices = () => {
    setBG({ services: true });
  };
  const removeBg = () => {
    setBG(false);
  };
  const toggleNav = () => {
    setIsOpen(!isOpen);
    setAnimated(!isAnimated);
  };
  // for closing  burgerMenu onScroll then is opened & isBlocked onTop 1 of 4

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
  // to close opened burger menu on-scroll  then is opened &  isBlocked onTop
  const [match_under_1023px, setMatch_under_1023px] = useState(
    window.matchMedia("(max-width: 767px) ").matches
  );

  useEffect(() => {
    hrefArch && addBgArch();
    hrefBat && addBgBat();
    hrefServices && addBgServices();

    const closeToggleNav = () => {
      if (isOpen) {
        setIsOpen(false);
        setAnimated(false);
      }
    };

    const m200 = window.matchMedia("(min-width: 200px) and (max-width:480px)");
    const mXs = window.matchMedia("(min-width: 481px) and (max-width:767px)");
    const mMd = window.matchMedia("(min-width: 768px)");
    const mob_and_Md = window.matchMedia("(max-width: 1023px)");

    const handleMatches = () => {
      setMatches(m200.matches);
      setMatches_xs(mXs.matches);
      setmatches_md(mMd.matches);
      setMatch_under_1023px(mob_and_Md.matches);
    };

    handleMatches();

    // Add listeners
    m200.addEventListener("change", handleMatches);
    mXs.addEventListener("change", handleMatches);
    mMd.addEventListener("change", handleMatches);
    mob_and_Md.addEventListener("change", handleMatches);

    // Elements
    const navBar = document.querySelector("#navBar");
    const banner = document.querySelector(".banner");
    const mainCv = document.querySelector("#mainCv");

    const fix = () => {
      navBar?.classList.add("fixed-top");
      banner?.classList.add("pt-fixed");
      mainCv?.classList.add("pt-fixed");
    };

    const unFix = () => {
      navBar?.classList.remove("fixed-top");
      banner?.classList.remove("pt-fixed");
      mainCv?.classList.remove("pt-fixed");
    };



    const scrollFunction = () => {
      const scroll = document.documentElement.scrollTop;
      const burger_menu_isBlocked = navBar?.classList.contains("fixed-top");
      const burger_menu_isOpened = navBar?.classList.contains("flex");

      // 👉 Added condition: close burger menu when scrolling in mobile mode
      if (match_under_1023px && burger_menu_isOpened && burger_menu_isBlocked) {
        closeToggleNav();
      }

      if (
        (matches && scroll > 430) ||
        (matches_xs && scroll > 520) ||
        (matches_md && scroll > 220)
      ) {
        fix();
      } else {
        unFix();
      }
    };

    window.addEventListener("scroll", scrollFunction);

    // Cleanup listeners on unmount
    return () => {
      m200.removeEventListener("change", handleMatches);
      mXs.removeEventListener("change", handleMatches);
      mMd.removeEventListener("change", handleMatches);
      mob_and_Md.removeEventListener("change", handleMatches);
      window.removeEventListener("scroll", scrollFunction);
      window.onload = null;
    };
  }, [
    hrefArch,
    hrefBat,
    hrefServices,
    matches,
    matches_xs,
    matches_md,
    match_under_1023px,
    isOpen,
  ]);

  //----------
  // const baseTitle =
  //   "absolute flex flex-wrap justify-center top-[25%] xs:top-[30%]   text-shadow3 text-[36px]  lg:text-[52px] font-dancing font-light";
  const style = {
    container:
      "flex flex-col items-center pb-[1px]  md:flex-row justify-around w-full h-auto  pt-[10px] px-[10px] ",
    item: " relative overflow-hidden flex flex-col justify-center items-center bg-cover h-[130px] xs:h-[160px] md:h-[200px] mb-[10px] w-full md:w-[32.5%]  md:rounded-[5px] shadow",
    footer:
      "absolute bottom-0 w-full h-10 md:h-14 flex items-center justify-center text-[24px] text-white bg-gradient-to-b from-[#00000003] to-[#000000cc] z-10",

    title:
      "absolute flex flex-wrap  justify-cente  qq top-[25%] xs:top-[30%]  text-[#ec6a01] text-shadow2 text-[36px]  lg:text-[52px] font-dancing font-bold rounded-[80px] px-2 ",
    // title_active: `${baseTitle} text-[#ec6a01]`,
    // navBar:
    //   "w-full h-auto py-[10px]   px-0 flex flex-col justify-center ml-0 md:pl-[1.5%] md:pr-[1.5%] lg:py-[15px] lg:flex-row items-center lg:justify-between border border-solid border-y-gray-500 bg-[#e0d1d1] z-50",
    navBar: `w-full h-auto  py-[10px] px-0  flex flex-col justify-center ml-0 
    md:pl-[1.5%] md:pr-[1.5%] lg:py-[15px] lg:flex-row items-center lg:justify-between 
    border border-solid border-y-gray-500 bg-[#e0d1d1] z-50 
    `,
    // fixed: "fixed top-0 pt-[46px] xs:pt-[53px] md:pt-[60px]",
    logo: "w-7 h-7 xs:w-9 xs:h-9 lg:w-10 lg:h-10 mx-2 md:mx-1 lg:mx-2",
  };
  //-----------

  return (
    <div className="flex flex-col items-center justify-center w-full h-auto bg-[--bg_body] ">
      {/* ----------------------- */}

      <div className={style.container}>
        <div
          id="archHighDiv"
          className={`${style.item} bg-arch bg-cover bg-center`}
        >
          <Link
            className="absolute w-full h-full z-20"
            onClick={addBgArch}
            // to="/architecture"
            to={`/${t.locale}/${t.archNav}`}
          ></Link>

          {isBG.arch && (
            <div
              id="bg_arch_hover"
              className="absolute w-full h-full bg-black/50"
            ></div>
          )}
          <h3 className={style.title}>{t.archTitle}</h3>
          {/* <h4 className={style.footer}>2004 - 2011</h4> */}
        </div>
        <div
          className={`${style.item} bg-bat bg-cover bg-center`}
          id="batHighDiv"
        >
          {/* BATIMENT */}

          <Link
            className="absolute w-full h-full z-20"
            onClick={addBgBat}
            // to="/batiment"
            to={`/${t.locale}/${t.batNav}`}
          ></Link>
          {isBG.bat && (
            <div
              id="bg_bat_hover"
              className="absolute w-full h-full bg-black/50"
            ></div>
          )}
          <h3 className={style.title}>{t.batTitle}</h3>
          {/* <h4 className={style.footer}>2011 - 2022...</h4> */}
        </div>
        <div className={`${style.item}  bg_services bg-cover bg-center`}>
          {/* ---TO SERVICES ------ */}
          {FR && (
            <Link
              className="absolute w-full h-full z-20"
              onClick={addBgServices}
              // to="/services"
              to={`/${t.locale}/${t.servicesNav}`}
            ></Link>
          )}

          {isBG.services && (
            <div
              id="bg_dev_hover"
              className="absolute w-full h-full bg-black/50"
            ></div>
          )}
          <img
            className="absolute w-[200px] s:w-[240px] h-auto"
            src={logo}
            alt="boogysh construction logo"
          />
        </div>
      </div>
      {/* ---------------------------------- */}
      {/* <div id="navBar" className={`${style.navBar} scroll`}> */}
      <div id="navBar" className={`${style.navBar} `}>
        <div className="w-[95%]  md:w-full flex items-center justify-between">
          <div className=" flex justify-center items-center">
            <h3 className="font-dancing text-[26px] pr-4 hidden sm:block">
              Victor Buga
            </h3>

            <h3 className="font-dancing text-[20px]  mr-3 hidden xxs:block sm:hidden">
              V. B.
            </h3>

            <LangSelect />
            <HeaderContact />
            <ButtonContactMe />
          </div>
          <HeaderBurger toggle={toggleNav} isAnimated={isAnimated} />
        </div>
        <nav
          // id="burgerMenu"
          //'max-h-[800px] opacity-100 translate-y-0 pointer-events-auto' : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none'
          className={`${
            // isOpen ? "flex" : "hidden"
            isOpen
              ? "pt-5 max-h-[300px] opacity-100 "
              : " max-h-0 opacity-0 pt-0"
          }w-auto flex h-auto flex-col md:flex-row items-center lg:p-0 lg:opacity-100  transition-height duration-500 ease-in-out overflow-hidden md:overflow-visible`}
        >
          <NavLink
            // onClick={addBgArch}
            onClick={addBgArch}
            id="architecture"
            // to="/architecture"
            to={`/${t.locale}/${t.archNav}`}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            {t.archTitle}
          </NavLink>
          <NavLink
            // onClick={addBgBat}
            onClick={addBgBat}
            id="batiment"
            // to="/batiment"
            to={`/${t.locale}/${t.batNav}`}
            className={({ isActive }) =>
              (isActive ? activeLink : normalLink) + "services_title_color-3"
            }
          >
            {t.batTitle}
          </NavLink>
          {FR && (
            <NavLink
              onClick={addBgServices}
              id="services"
              // to="/service"
              to={`/${t.locale}/${t.servicesNav}`}
              className={({ isActive }) =>
                (isActive ? activeLink : normalLink) + "services_title_color-3 "
              }
            >
              {t.servicesTitle}
            </NavLink>
          )}

          <NavLink
            onClick={removeBg}
            id="developpement"
            // to="/developpement"
            to={`/${t.locale}/${t.devNav}`}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            {t.devTitleNav}
          </NavLink>
          <NavLink
            onClick={removeBg}
            id="cv"
            to={`/${t.locale}/cv`}
            // to={t.homeNav}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            CV
          </NavLink>
        </nav>
      </div>
      {/* //------------------------------------------------------------- */}
    </div>
  );
}
export default Header;
