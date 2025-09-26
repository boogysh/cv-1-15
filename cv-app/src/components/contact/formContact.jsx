import { useState } from "react";
// import { FiEdit2 } from "react-icons/fi";
import LoaderBtnContact from "../loader/loaderBtnContact";
import useForm from "../../hooks/useForm/useFormContact";
import emailjs from "@emailjs/browser";

// const FormContact = ({ sendMessage }) => {
const FormContact = () => {
  const [isLoading, setLoading] = useState(false);
  const [isSending, setSending] = useState(false);
  // const [isAllValues, setAllValues] = useState(false);

  // useEffect(() => {}, []);

  const {
    val,
    borderRedFunc,
    resetValues,
    borderRed,
    matchFN,
    matchLN,
    matchEmail,
    matchMessage,
  } = useForm();
  //

  const newMessage = {
    firstName: `${val.firstName}`,
    lastName: `${val.lastName}`,
    email: `${val.email}`,
    messageTxt: `${val.message}`,
  };
  // console.log("newMessage", newMessage);

  const allValues = val.firstName && val.lastName && val.email && val.message;

  //-------  SEND MAIL -----------------

  const templateParams = {
    name: newMessage.firstName +  " " + newMessage.lastName,
    notes: newMessage.messageTxt,
    email: newMessage.email
  };

  const sendMail = () => {
    
    emailjs
      .send("service_rzuujy6", "template_wzrwyn8", templateParams, {
        publicKey: "OQTtdAZ2AH8XyZRag",
      })
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (err) => {
          console.log("FAILED...", err);
        }
      );
  };
  console.log(sendMail);

  // const sendMessage = async () => {
  const sendMessage = async (e) => {
    e.preventDefault();
    !allValues && borderRedFunc();
    // console.log("boderRED", borderRed);
    if (allValues) {
      const savedMessagePost = fetch(
        // `${process.env.REACT_APP_URL}/api/messages`,
        `https://cv-back-25.vercel.app/api/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newMessage),
        }
      );

      if (savedMessagePost) {
        setLoading(false); // not working ?????????????????????
        setSending(true);
        resetValues();
      }
    } else {
      borderRedFunc();
      // console.log("else---error-message-post++++++++++++++++++++++++++++++");
      setLoading(false);
    }
  };

  const style = {
    input_red:
      "w-full   p-2 xs:p-4  bg-red-100 rounded-md  border-[1px] border-red-500 outline-2 outline-red-500 ",

    input_cyan:
      "w-full p-2 xs:p-4 bg-blue-50 border-[1px] border-gray-800 rounded-md outline-2 outline-orange-400",
  };

  return (
    <div>
      {!isSending && (
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
            onClick={
              allValues ? () => setLoading(true) : () => setLoading(false)
            }
            // onClick={() => setLoading(true)}
            // className="z-10 relative flex w-auto h-auto justify-center items-center"
            className="z-10 relative flex w-auto h-auto justify-center items-center"
          >
            <button
              onClick={(e) => sendMessage(e) && sendMail()}
              type="submit"
              // disabled={!allValues}
              className="z-99 w-full h-14  my-5 mt-2 xs:mt-5 bg-orange-500 rounded-md text-white  outline-2 text-xs font-medium  hover:bg-orange-400"
            >
              {!isLoading && <span>ENVOYER</span>}
            </button>
            {/* {isLoading && ( */}
            {isLoading && (
              <div
                className={`absolute flex justify-center items-center w-auto h-auto z-99`}
              >
                <LoaderBtnContact />
              </div>
            )}
          </div>
        </form>
      )}
      {isSending && (
        <h2 className="text-[22px] xs:text-[26px] md:text-[30 px] p-3 ">
          Message envoyé avec succes
        </h2>
      )}
    </div>
  );
};

export default FormContact;
