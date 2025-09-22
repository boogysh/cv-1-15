import { useState } from "react";
import { FN, LN, E_MAIL, MSG } from "./adviceMatch";

const useForm = () => {
  const [val, setVal] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [borderRed, setBorderRed] = useState({
    firstName: false,
    lastName: false,
    tel: false,
    email: false,
    message: false,
  });

  //-----MATCH FIRST NAME
  const matchFN = (e) => {
    const value = e.target.value;
    const FN_ErrMsg = document.getElementById("FNErrorMsg");
    const matched = value.match(/^[a-z A-Z]{3,25}$/);
    if (value.length === 0) {
      FN_ErrMsg.innerHTML = "";
      setVal({ ...val, firstName: "" });
      setBorderRed({ ...borderRed, firstName: false });
    } else if (value.length < 3 || value.length > 25) {
      FN_ErrMsg.innerHTML = FN.adviceLength;
      setVal({ ...val, firstName: "" });
      setBorderRed({ ...borderRed, firstName: true });
    } else if (matched) {
      FN_ErrMsg.innerHTML = "";
      setVal({ ...val, firstName: value });
      setBorderRed({ ...borderRed, firstName: false });
    } else if (!matched) {
      FN_ErrMsg.innerHTML = FN.adviceContent;
      setVal({ ...val, firstName: "" });
      setBorderRed({ ...borderRed, firstName: true });
    }
  };
  //-----MATCH LAST NAME---------
  const matchLN = (e) => {
    const value = e.target.value;
    const LN_ErrMsg = document.getElementById("LNErrorMsg");
    const matched = value.match(/^[a-z A-Z]{3,25}$/);
    if (value.length === 0) {
      LN_ErrMsg.innerHTML = "";
      setVal({ ...val, lastName: "" });
      setBorderRed({ ...borderRed, lastName: false });
    } else if (value.length < 3 || value.length > 25) {
      LN_ErrMsg.innerHTML = LN.adviceLength;
      setVal({ ...val, lastName: "" });
      setBorderRed({ ...borderRed, lastName: true });
    } else if (matched) {
      LN_ErrMsg.innerHTML = "";
      setVal({ ...val, lastName: value });
      setBorderRed({ ...borderRed, lastName: false });
    } else if (!matched) {
      LN_ErrMsg.innerHTML = LN.adviceContent;
      setVal({ ...val, lastName: "" });
      setBorderRed({ ...borderRed, lastName: true });
    }
  };

  //-----MATCH EMAIL
  const matchEmail = (e) => {
    const value = e.target.value;
    const EMAIL_ErrMsg = document.getElementById("EmailErrorMsg");
    const matched = value.match(
      /[a-zA-Z0-9]+[.]?([a-zA-Z0-9]+)?[@][a-z]{3,9}[.][a-z]{2,5}/g
    );
    if (value.length === 0) EMAIL_ErrMsg.innerHTML = "";
    else if (value.length < 5) {
      EMAIL_ErrMsg.innerHTML = E_MAIL.adviceLength;
      setVal({ ...val, email: "" });
      //   setBorderRed({ ...borderRed, email: true });
    } else if (matched) {
      EMAIL_ErrMsg.innerHTML = "";
      setVal({ ...val, email: value });
      setBorderRed({ ...borderRed, email: false });
    } else if (!matched) {
      EMAIL_ErrMsg.innerHTML = E_MAIL.adviceContent;
      setVal({ ...val, email: "" });
      //   setBorderRed({ ...borderRed, email: true });
    }
  };

  //-----MATCH Message--------
  const matchMessage = (e) => {
    const value = e.target.value;
    const MSG_ErrMsg = document.getElementById("MSG_ErrorMsg");
    const matched = value.match(
      /^[a-zA-Z0-9~!@#$%^&*()`{};':,./<>?|"+£¤áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]+$/
    );
    if (value.length === 0) {
      MSG_ErrMsg.innerHTML = "";
      setVal({ ...val, message: "" });
      setBorderRed({ ...borderRed, message: false });
    } else if (value.length < 10) {
      MSG_ErrMsg.innerHTML = MSG.adviceLength;
      setVal({ ...val, message: "" });
      setBorderRed({ ...borderRed, message: true });
    } else if (matched) {
      MSG_ErrMsg.innerHTML = "";
      setVal({ ...val, message: value });
      setBorderRed({ ...borderRed, message: false });
    } else if (!matched) {
      MSG_ErrMsg.innerHTML = MSG.adviceContent;
      setVal({ ...val, message: "" });
      setBorderRed({ ...borderRed, message: true });
    }
  };

  //-----RESET ALL INPUT VALUES
  const resetValues = () => {
    // Array.from(document.querySelectorAll('input'));.
    const commentInput = document.querySelectorAll("input");
    commentInput.forEach((input) => (input.value = ""));
    const commentTextarea = document.querySelectorAll("textarea");
    commentTextarea.forEach((input) => (input.value = ""));
    return (commentInput.value = "") && (commentTextarea.value = "");
  };
  //------SET BORDER RED
  const borderRedFunc = () => {
    if (!val.firstName) setBorderRed({ ...borderRed, firstName: true });
    if (!val.lastName) setBorderRed({ ...borderRed, lastName: true });
    if (!val.email) setBorderRed({ ...borderRed, email: true });
    if (!val.message) setBorderRed({ ...borderRed, message: true });
    else return;
  };
  return {
    matchFN,
    matchLN,
    matchEmail,
    matchMessage,
    borderRedFunc,
    resetValues,
    val,
    borderRed,
  };
};

export default useForm;
