import React from "react";
// import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function LangSelect() {
  // const { t } = useSelector((state) => state.langReducer);
  // const [newPath, setNewPath] = useState("");

  const Fr = window.location.href.includes("/fr");
  const En = window.location.href.includes("/en");
  const Ro = window.location.href.includes("/ro");
  //--------------------------------------------
  // const path = window.location.pathname;
  // const pathSliced = path.slice(4, path.length);
  // console.log("pathSliced:", pathSliced);

  // const locale = path.slice(0, 3);
  // console.log("locale:", locale);
  //--------------------------------------------
  // const Arch = window.location.href.includes("architecture" || "arhitectura");
  // console.log("Arch:", Arch);
  //----------------------------------------------
  // const newPathFunc = () => {
  //   pathSliced.length === 0 && setNewPath("");
  // };
  // newPathFunc();
  // console.log("newPath:", newPath);
  //--------------------------------------------

  const dispatch = useDispatch();

  const navTo = (arg) => {
    return window.location.replace(arg);
  };

  const langChange = (e) => {
    const val = e.target.value;
    val === "fr" && dispatch({ type: "FR" }) && navTo(`/fr`);
    val === "en" && dispatch({ type: "EN" }) && navTo(`/en`);
    val === "ro" && dispatch({ type: "RO" }) && navTo(`/ro`);
  };

  return (
    <>
      <select
        // className="langSelect"
        className="flex items-center mx-[10px]  h-5 xs:h-7 rounded-lg"
        defaultValue={(Fr && "fr") || (En && "en") || (Ro && "ro")}
        onChange={langChange}
        id="lang-change"
      >
        <option  id="fr" value="fr">
          FR
        </option>
        <option id="en" value="en">
          EN
        </option>
        <option id="ro" value="ro">
          RO
        </option>
      </select>
    </>
  );
}
