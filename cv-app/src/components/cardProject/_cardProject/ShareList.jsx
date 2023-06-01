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

const ShareList = ({ description, url }) => {
  return (
    <div className="flex w-auto h-auto">
      {/*------ EMAIL ------------- */}
      <EmailShareButton url={url} description={description}>
        <div className="btn-icon  ml-0 border-none mr-0 xxs:mr-1">
          <CiMail className={`w-5 h-5 s:w-6 s:h-6`} />
        </div>
      </EmailShareButton>

      {/*------ FACEBOOK ------------- */}
      <FacebookShareButton url={url} description={description}>
        <div className="btn-icon  ml-0 border-none mr-0 xxs:mr-1">
          <CiFacebook className={`w-[22px] h-[22px] s:w-[26px] s:h-[26px] `} />
        </div>
      </FacebookShareButton>

      {/*------ WHATSAPP ------------- */}
      <WhatsappShareButton url={url} description={description}>
        <div className="btn-icon  ml-0 border-none mr-0 xxs:mr-1">
          <BsWhatsapp className={`w-4 h-4 s:w-5 s:h-5 `} />
        </div>
      </WhatsappShareButton>

      {/*------ VIBER ------------- */}
      {/* <div className="hidden sm:flex xxs:items-center">
        <ViberShareButton url={url} description={description}>
          <div className="btn-icon  ml-0 border-none mr-0 xxs:mr-1 ">
            <FaViber className={`w-4 h-4 s:w-5 s:h-5 `} />
          </div>
        </ViberShareButton>
      </div> */}

      {/*------ LINKEDIN ------------- */}
      <LinkedinShareButton url={url} description={description}>
        <div className="btn-icon  ml-0 border-none mr-1">
          <CiLinkedin className={`w-5 h-5 s:w-6 s:h-6 `} />
        </div>
      </LinkedinShareButton>
    </div>
  );
};
export default ShareList;
