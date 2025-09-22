import React, { useState } from "react";
// import { FiEdit2 } from "react-icons/fi";
import LoaderBtnContact from "../loader/loaderBtnContact";

const FormContact = ({
  borderRed,
  matchFN,
  matchLN,
  matchEmail,
  matchMessage,
  sendMessage,
}) => {
  const [isLoading, setLoading] = useState(false);

  const style = {
    input_red:
      "w-full   p-2 xs:p-4  bg-blue-50 rounded-md  border-[1px] border-red-500 outline-red-500",

    input_cyan:
      "w-full p-2 xs:p-4 bg-blue-50 border-[1px] border-gray-800 rounded-md outline-2 outline-orange-400",
  };

  return (
    <form>
      {/* ---FIRST NAME--- */}
      <label
        className="relative bg-white px-2 rounded top-2 left-3"
        htmlFor="firstName"
      >
        Prénom
      </label>
      <input
        onChange={matchFN}
        className={borderRed.firstName ? style.input_red : style.input_cyan}
        id="firstName"
        placeholder="Votre Prénom"
        type="text"
      />
      <p
        id="FNErrorMsg"
        className="min-h-[1.3rem] text-xs pt-1 text-red-500"
      ></p>

      {/* ----LAST NAME---- */}

      <label
        className="relative bg-white px-2 rounded top-2 left-3"
        htmlFor="lastName"
      >
        Nom
      </label>
      <input
        onChange={matchLN}
        className={borderRed.lastName ? style.input_red : style.input_cyan}
        id="lastName"
        placeholder="Votre Nom"
        type="text"
      />
      <p
        id="LNErrorMsg"
        className="min-h-[1.3rem] text-xs pt-1 text-red-500"
      ></p>
      {/* ------EMAIL-------- */}

      <label
        className="relative bg-white px-2 rounded top-2 left-3"
        htmlFor="email"
      >
        Email
      </label>
      <input
        onChange={matchEmail}
        className={borderRed.email ? style.input_red : style.input_cyan}
        id="email"
        placeholder="Votre addresse email"
        type="email"
      />
      <p
        id="EmailErrorMsg"
        className=" min-h-[1.3rem] text-xs pt-1 text-red-500"
      ></p>
      {/* ---MESSAGE--- */}
      <label
        className="relative bg-white px-2 rounded top-2 left-3"
        htmlFor="firstName"
      >
        Message
      </label>
      <textarea
        onChange={matchMessage}
        className={`h-auto min-h-[150px] ${
          borderRed.message ? style.input_red : style.input_cyan
        }} `}
        id="firstName"
        placeholder="Votre message"
        type="text"
      />
      <p
        id="MSG_ErrorMsg"
        className="min-h-[1.3rem] text-xs pt-1 text-red-500"
      ></p>

      {/* SEND BTN */}
      <div
        onClick={() => setLoading(true)}
        className="z-10 relative flex w-auto h-auto justify-center items-center"
      >
        <button
          onClick={sendMessage}
          type="submit"
          className="z-99 w-full h-14  my-5 mt-2 xs:mt-5 bg-orange-500 rounded-md text-white  outline-2 text-xs font-medium  hover:bg-orange-400"
        >
          {!isLoading && <span>ENVOYER</span>}
        </button>
        {isLoading && (
          <div
            className={`absolute flex justify-center items-center w-auto h-auto z-99`}
          >
            <LoaderBtnContact />
          </div>
        )}
      </div>
    </form>
  );
};

export default FormContact;
