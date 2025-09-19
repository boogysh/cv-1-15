// import "./banner.css";
import { useSelector } from "react-redux";
import banner_logo from "../assets/icon-9.png";

function Banner({ src, title }) {
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
  };

  return (
    <div className="flex justify-end items-start w-full h-auto">
      <div className="flex w-full h-auto bg-gray-900">
        <img className="object-cover w-full h-auto opacity-70" src={src} alt="banner" />
      </div>
      <h1
        className={`${hrefArch && style.title}  ${
          (hrefBat || hrefDev || hrefServices) && style.titleBat
        } `}
      >
        {title}
      </h1>

      {(hrefBat || hrefServices) && (
        <div className="absolute flex w-full justify-center items-center text-center  mt-5 md:mt-8 lg:mt-12 xl:mt-[100px]">
          <img
            src={banner_logo}
            alt="logo Boogysh"
            className=" w-[55px] xs:w-[70x] sm:w-[90px] md:w-[110px] lg:w-[140px]"
          />
          {
            <h2 className={`${style.h2TitleServices} text-shadow2`}>
              oogysh Construction
            </h2>
          }
        </div>
      )}
    </div>
  );
}
export default Banner;
