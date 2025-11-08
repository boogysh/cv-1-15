import React, { useState, useEffect } from "react";
import logo_tel from "../assets/logos/telephone.png";
import logo_gmail from "../assets/logos/gmail.png";
import logo_linkedin from "../assets/logos/linkedin.png";
import { useSelector } from "react-redux";
import  FooterAgreggateRange  from "./FooterAgreggateRange";

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
          <h3 className="text-[22px]  md:text-[28px] pr-[10px] leading-0  text-white font-dancing flex items-center">
            Contact:
          </h3>
          <div className="flex  pt-[7px]">
            <p className="text-white  flex items-center pb-1 text-[16px] xxs:text-[18px] xs:text-[20px] sm:text-[22px]">
              07.53.75.81.64
            </p>
            <a
              className="flex items-center mb-[10px] pl-[15px] transition duration-200 ease-in-out hover:scale-[1.02] "
              href="tel:+33753758164"
            >
              <img
                className="w-6 h-6 object-cover"
                src={logo_tel}
                alt="telephone"
              />
            </a>
            <a
              className="flex items-center mb-[10px] pl-[15px] transition duration-200 ease-in-out hover:scale-[1.02]"
              href="mailto:bugavictor86@gmail.com?subject=Message_Buga_Victor"
            >
              <img
                className="w-6 h-6 object-cover"
                src={logo_gmail}
                alt="gmail"
              />
            </a>
            <a
              className="flex items-center mb-[10px] pl-[15px] transition duration-200 ease-in-out hover:scale-[1.02]"
              href="https://www.linkedin.com/in/victor-buga"
              target="blank"
            >
              <img
                className="w-6 h-6 object-cover"
                src={logo_linkedin}
                alt="linkedin"
              />
            </a>
          </div>
        </div>
        <h5 className=" text-base md:text-[18px]    text-white font-dancing">
          &copy; {t.footer_p1}
          <span className="h5_footer_span">v_1.17</span>
        </h5>
        <div className="project-footer mt-2">
          <FooterAgreggateRange />
        </div>
        <h5 className="text-[12px] md:text-base pb-4 text-white font-dancing">
          {t.footer_p2} : <span className="h5_footer_span">08/11/2025</span>{" "}
        </h5>
      </footer>
    )
  );
}
export default Footer;
