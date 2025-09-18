import React, { useState, useEffect } from "react";
import logo_tel from "../assets/logos/telephone.png";
import logo_gmail from "../assets/logos/gmail.png";
import logo_linkedin from "../assets/logos/linkedin.png";
import { useSelector } from "react-redux";

function Footer() {
  const { t } = useSelector((state) => state.langReducer);
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 400);
  }, [show]);
  return (
    show && (
      <footer className="w-full min-h-[100px] bg-[#171717] flex flex-col justify-center items-center m-0 pt-[10px] md:pt-[20px]">
        <div className="flex">
          <h3 className="text-[22px]  md:text-[28px] pr-[10px]  text-white font-dancing ">Contact:</h3>
          <div className="flex  pt-[7px]">
            <a className="flex items-center mb-[10px] pl-[15px] transition duration-200 ease-in-out hover:scale-[1.02] " href="tel:+33753758164">
              <img className="w-6 h-6 object-cover" src={logo_tel} alt="telephone" />
            </a>
            <a
              className="flex items-center mb-[10px] pl-[15px] transition duration-200 ease-in-out hover:scale-[1.02]"
              href="mailto:bugavictor86@gmail.com?subject=Message_Buga_Victor"
            >
              <img className="w-6 h-6 object-cover" src={logo_gmail} alt="gmail" />
            </a>
            <a
              className="flex items-center mb-[10px] pl-[15px] transition duration-200 ease-in-out hover:scale-[1.02]"
              href="https://www.linkedin.com/in/buga-victor-540913245/"
              target="blank"
            >
              <img className="w-6 h-6 object-cover" src={logo_linkedin} alt="linkedin" />
            </a>
          </div>
        </div>
        <h5 className=" text-base md:text-[18px]  pb-[10px]  text-white font-dancing">
          &copy; {t.footer_p1}
          <span className="h5_footer_span">v_1.16</span>
        </h5>
        <h5 className="text-[12px] md:text-base pb-5 text-white font-dancing">
          {t.footer_p2} : <span className="h5_footer_span">17/09/2025</span>{" "}
        </h5>
      </footer>
    )
  );
}
export default Footer;
