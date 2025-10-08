import { useSelector } from "react-redux";
import { useState } from "react";
import logo_boogysh_construction from "../assets/logo-boogysh-construction-70.png";
// import logo_boogysh_construction_2 from "../assets/logo-boogysh-construction-2-70.png"; //last
// alternative bg-opacity: 55-60-70-80-100
// alternative bg-opacity: 55-60-70-80-100
// alternative bg-opacity: 55-60-70-80-100
import ButtonNewProjects from "../components/ButtonNewProjects";
import html from "../assets/pr-dev/html.png";
import css from "../assets/pr-dev/css.png";
import js from "../assets/pr-dev/js.png";
import react from "../assets/pr-dev/react.png";
import node from "../assets/pr-dev/node.png";

function Banner({ src, title }) {
  const [loading, setLoading] = useState(true);
  const { t } = useSelector((state) => state.langReducer);

  const hrefArch = window.location.href.includes(t.archNav);
  const hrefBat = window.location.href.includes(t.batNav);
  const hrefDev = window.location.href.includes(t.devNav);
  const hrefServices = window.location.href.includes(t.servicesNav);

  const style = {
    title:
      "absolute font-dancing font-semibold text-[24px] xs:text-[36px] sm:text-[40px] lg:text-[60px] 2xl:text-[72px] px-2 xs:px-5 lg:px-8 2xl:px-10",
    titleBat:
      "absolute font-dancing font-semibold text-[24px] xs:text-[30px] sm:text-[40px] lg:text-[60px] 2xl:text-[72px] px-2 xs:px-5 lg:px-8 2xl:px-10 text-white",
    h2TitleServices:
      "font-dancing font-semibold text-[22px] xs:text-[28px] sm:text-[32px] md:text-[54px] lg:text-[60px] 2xl:text-[72px] services_title_color-3",
      logo: "w-6 h-6 xxs:w-8 xxs:h-8 md:w-12 md:h-12 lg:w-[70px] lg:h-[70px] mx-1 md:mx-2",
  };

  return (
    <div className="banner flex pt-fixed justify-end items-start w-full h-auto relative">
      <div className="flex w-full h-auto bg-gray-900 ">
        {/* {loading? <Loader/> : ( <img className="object-cover w-full h-auto " src={src} alt="banner" onLoad={() => setLoading(false)} />)} */}
        {/* {loading? <Loader/> : ( <img className="object-cover w-full h-auto " src={src} alt="banner" onLoad={() => setLoading(false)} />)} */}
        <img
          className={`object-cover w-full h-auto ${
            loading ? "opacity-0" : "opacity-100"
          }`}
          src={src}
          alt="banner"
          onLoad={() => setLoading(false)}
        />
      </div>

      {!hrefServices && (
        <h1
          className={`${hrefArch && style.title}  ${
            (hrefBat || hrefDev || hrefServices) && style.titleBat
          } `}
        >
          {title}
        </h1>
      )}
      {(hrefBat || hrefServices) && (
        <span className="absolute bottom-0 right-0  p-0 pr-1 lg:p-2 lg:pr-3  text-[#ec6a01] font-semibold text-shadow2  text-[10px] xxs:text-[11px] xs:text-[14px] sm:text-[16px] md:text-[18px] tracking-[-0.4px]">
          SIRET: 75056847900026
        </span>
      )}
      <div className="absolute w-auto h-auto left-2 bg-none">
        <ButtonNewProjects />
      </div>
      {hrefBat && (
        <div className="absolute flex w-full justify-center items-center text-center  mt-3 xs:mt-2 md:mt-5 lg:mt-12 xl:mt-10 2xl:mt-[50px]">
          <img
            src={logo_boogysh_construction}
            alt="logo Boogysh"
            className="w-[200px] xs:w-[280px] sm:w-[360px] md:w-[440px] lg:w-[600px] xl:w-[650px] 2xl:w-[800px]"
          />
        </div>
      )}
      {hrefDev && (
        <div className="absolute top-[50%] left-0 flex justify-center w-full h-auto;">
          <img className={style.logo} src={html} alt="html" />
          <img className={style.logo} src={css} alt="css" />
          <img className={style.logo} src={js} alt="js" />
          <img className={style.logo} src={react} alt="react" />
          <img className={style.logo} src={node} alt="node" />
        </div>
      )}
    </div>
  );
}
export default Banner;

// small logo
//         <div className="absolute top-[-20px] right-[-15px]  xxs:top-[-20px] xs:top-[-20px]  flex w-full justify-end items-center text-center  mt-2 xs:mt-2 md:mt-2
//  ">
//           <img
//             src={logo_boogysh_construction_2}
//             alt="logo Boogysh"
//             className="w-[100px] xxs:w-[130px] xs:w-[150px] sm:w-[200px] md:w-[230px] lg:w-[320px] xl:w-[360px] 2xl:w-[460px]"
//           />
//         </div>
// <div className="absolute top-[-25px] xxs:top-[-20px] xs:top-[-10px] flex w-full justify-center items-center text-center  mt-3 xs:mt-2 md:mt-5 lg:mt-12 xl:mt-10 2xl:mt-[70px] ">
//   <img
//     src={logo_boogysh_construction_2}
//     alt="logo Boogysh"
//     className="w-[120px] xxs:w-[130px] xs:w-[150px] sm:w-[200px] md:w-[230px] lg:w-[280px] xl:w-[420px] 2xl:w-[420px]"
//   />
// </div>

/////////////  BIG LOGO ////////////

// <div className="absolute flex w-full justify-center items-center text-center  mt-3 xs:mt-2 md:mt-5 lg:mt-12 xl:mt-10 2xl:mt-[50px]" >
//   <img
//     src={logo_boogysh_construction}
//     alt="logo Boogysh"
//     className="w-[200px] xs:w-[280px] sm:w-[360px] md:w-[440px] lg:w-[600px] xl:w-[650px] 2xl:w-[800px]"
//   />
// </div>
