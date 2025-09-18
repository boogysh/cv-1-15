// import "./banner.css";
import { useSelector } from "react-redux";

function Banner({ src, title }) {
  const { t } = useSelector((state) => state.langReducer);

  const hrefArch = window.location.href.includes(t.archNav);
  const hrefBat = window.location.href.includes(t.batNav);
  const hrefDev = window.location.href.includes(t.devNav);
  const hrefServices = window.location.href.includes(t.servicesNav);

  const style = {
    title:
      "absolute font-dancing font-semibold text-[24px] xs:text-[36px] sm:text-[48px] lg:text-[60px] 2xl:text-[72px] px-2 xs:px-5 lg:px-8 2xl:px-10",
    titleBat:
      "absolute font-dancing font-semibold text-[24px] xs:text-[36px] sm:text-[48px] lg:text-[60px] 2xl:text-[72px] px-2 xs:px-5 lg:px-8 2xl:px-10 text-white",
  };

  return (
    <div className="flex justify-end items-start w-full h-auto">
      <img className="object-cover w-full h-auto" src={src} alt="banner" />
      <h1
        className={`${hrefArch && style.title}  ${
          (hrefBat || hrefDev || hrefServices) && style.titleBat
        } `}
      >
        {title}
      </h1>
    </div>
  );
}
export default Banner;
