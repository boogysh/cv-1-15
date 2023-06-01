import React from "react";
// import "./header_contact.css";
import logo_tel from "../assets/logos/telephone.png";
import logo_gmail from "../assets/logos/gmail.png";
import logo_linkedin from "../assets/logos/linkedin.png";

export default function Header_contact() {
  const style = {
    logo: "h-6 w-6 lg:w-7 lg:h-7 object-cover transition duration-200 ease-in-out hover:scale-[1.02]",
    item: "flex items-center pl-2 lg:pl-3",
  };
  return (
    <div className="flex">
      <a className={style.item} href="tel:+33753758164" title="+33753758164">
        <img className={style.logo} src={logo_tel} alt="telephone" />
      </a>
      <a
        className={style.item}
        href="mailto:bugavictor86@gmail.com? subject=Message_Buga_Victor"
        title="bugavictor86@gmail.com"
      >
        <img className={style.logo} src={logo_gmail} alt="gmail" />
      </a>
      <a
        className={style.item}
        href="https://www.linkedin.com/in/buga-victor-540913245/"
        title="https://www.linkedin.com/in/buga-victor-540913245/"
        target="blank"
      >
        <img className={style.logo} src={logo_linkedin} alt="linkedin" />
      </a>
    </div>
  );
}
