import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import HeaderContact from "./HeaderContact.jsx";
import ButtonContactMe from "./ButtonContactMe.jsx";
import HeaderBurger from "./header-burger/HeaderBurger.jsx";
import LangSelect from "./langSelect.jsx";
import { useSelector } from "react-redux";
// import logo from "../assets/logo-boogysh-construction-2-70.png";
// import Header3ImagesBgLoading from "./Header_3_Images_bg_loading.jsx";

function Header() {
  const { t } = useSelector((state) => state.langReducer);
  // const hrefArch = window.location.href.includes(t.archNav);
  // const hrefBat = window.location.href.includes(t.batNav);
  // const hrefServices = window.location.href.includes(t.servicesNav);
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

  const toggleNav = () => {
    setIsOpen(!isOpen);
    setAnimated(!isAnimated);
  };

  const closeToggleNav = () => {
      if (isOpen) {
        setIsOpen(false);
        setAnimated(false);
      }
    };



  window.addEventListener("scroll", closeToggleNav);
  // for closing  burgerMenu onScroll then is opened & isBlocked onTop 1 of 4

  //---------scroll limit-----------------

  const style = {
    container:
      "flex flex-col items-center pb-[1px]  md:flex-row justify-around w-full h-auto  pt-[10px] px-[10px] ",
    item: " relative overflow-hidden flex flex-col justify-center items-center bg-cover h-[130px] xs:h-[160px] md:h-[200px] mb-[10px] w-full md:w-[32.5%]  md:rounded-[5px] shadow",
    footer:
      "absolute bottom-0 w-full h-10 md:h-14 flex items-center justify-center text-[24px] text-white bg-gradient-to-b from-[#00000003] to-[#000000cc] z-10",

    title:
      "absolute flex flex-wrap  justify-cente  qq top-[25%] xs:top-[30%]  text-[#ec6a01] text-shadow2 text-[36px]  lg:text-[52px] font-dancing font-bold rounded-[80px] px-2 ",

    navBar: `w-full h-auto  fixed-top py-[10px] px-0  flex flex-col justify-center ml-0 
    md:pl-[1.5%] md:pr-[1.5%] lg:py-[15px] lg:flex-row items-center lg:justify-between 
    border border-solid border-y-gray-500 bg-[#e0d1d1] z-50
    `,
    logo: "w-7 h-7 xs:w-9 xs:h-9 lg:w-10 lg:h-10 mx-2 md:mx-1 lg:mx-2",
  };
  //-----------

  return (
    <div className="flex  flex-col items-center justify-center w-full h-auto bg-[--bg_body] ">
      {/* ----------------------- */}

      {/* ---------------------------------- */}
      {/* <div id="navBar" className={`${style.navBar} scroll`}> */}
      <div id="navBar" className={`${style.navBar} `}>
        <div className="w-[95%]  md:w-full flex items-center justify-between pr-3">
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
            // onClick={addBgArch}
            id="architecture"
            // to="/architecture"
            to={`/${t.locale}/${t.archNav}`}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            {t.archTitle}
          </NavLink>
          <NavLink
            // onClick={addBgBat}
            // onClick={addBgBat}
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
              // onClick={addBgServices}
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
            // onClick={removeBg}
            id="developpement"
            // to="/developpement"
            to={`/${t.locale}/${t.devNav}`}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            {t.devTitleNav}
          </NavLink>
          <NavLink
            // onClick={removeBg}
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
