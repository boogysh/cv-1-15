import React from "react";
import { BsWhatsapp } from "react-icons/bs";
import { CiFacebook, CiLinkedin, CiMail } from "react-icons/ci";
// import { FaViber } from "react-icons/fa";

import {
  EmailShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  // ViberShareButton,
  LinkedinShareButton,
} from "react-share";

const ShareList = ({ description, url, isOpen }) => {
  return (
    <div
      className={`absolute right-0 top-0 flex items-center  shadow-lg rounded-full px-0 pr-10  border-solid bg-[#f1f1f1] border-gray-300 border-[1px]
        transition-opacity  duration-[400ms] ease-in-out z-10
        ${
          isOpen
            ? "translate-x-[0%] opacity-100"
            : "translate-x-[120%] opacity-0"
        }
      `}
    >
      <EmailShareButton url={url} description={description}>
        <div className="btn-icon ml-2 border-none">
          <CiMail className="w-5 h-5 s:w-6 s:h-6" />
        </div>
      </EmailShareButton>

      <FacebookShareButton url={url} description={description}>
        <div className="btn-icon  ml-2 border-none">
          <CiFacebook className="w-[22px] h-[22px] s:w-[26px] s:h-[26px]" />
        </div>
      </FacebookShareButton>

      <WhatsappShareButton url={url} description={description}>
        <div className="btn-icon  ml-2 border-none">
          <BsWhatsapp className="w-4 h-4 s:w-5 s:h-5" />
        </div>
      </WhatsappShareButton>

      <LinkedinShareButton url={url} description={description}>
        <div className="btn-icon  ml-2 border-none">
          <CiLinkedin className="w-5 h-5 s:w-6 s:h-6" />
        </div>
      </LinkedinShareButton>
    </div>
  );
};  

export default ShareList;
