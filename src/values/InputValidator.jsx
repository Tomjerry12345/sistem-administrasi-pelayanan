import { useState } from "react";
import { log } from "./Utilitas";

const InputValidator = (input, x) => {
  // const [notValid, setNotValid] = useState(() => {
  //   let i = [];
  //   // eslint-disable-next-line no-unused-vars

  //   if (input !== null) {
  //     // eslint-disable-next-line no-unused-vars
  //     for (let _ in input) {
  //       i.push(true);
  //     }
  //   } else {
  //     for (let j = 0; j < x; j++) {
  //       i.push(true);
  //     }
  //   }

  //   return i;
  // });

  // const [notValid, setNotValid] = useState(() =>
  //   input !== null ? Array(input?.length ?? 0).fill(true) : Array(x).fill(true)
  // );

  let notValid = input !== null ? Array(input?.length ?? 0).fill(true) : Array(x).fill(true);

  log("test", "test");

  const checkNotValid = (value, key) => {
    if (checkEmpty(value)) {
      return true;
    } else if (key === "no_kk" && checkLength(value, 16)) {
      return true;
    } else if (key === "nik" && checkLength(value, 16)) {
      return true;
    } else {
      return false;
    }
  };

  const updateValid = (value, index, key) => {
    const current = [...notValid];
    current[index] = checkNotValid(value, key);
    // setNotValid(current);
    notValid = current;
  };

  const setTofalseValue = (val) => {
    // setNotValid(() => {
    //   let i = [];
    //   for (const key of Object.keys(val)) {
    //     if (key !== "id" && key !== "bulan" && key !== "tahun") {
    //       console.log(key, val[key]);
    //       i.push(checkNotValid(val[key], key));
    //     }
    //   }
    //   return i;
    // });
  };

  const checkNotValidAll = () => {
    let notValidAll = false;

    console.log("notValid", notValid);

    notValid.forEach((value) => {
      if (value === true) {
        notValidAll = true;
      }
    });

    // const notValidAll = notValid.some((val) => val === false);

    return !notValidAll;
  };

  const messageNotValid = (value, key) => {
    if (checkEmpty(value)) {
      return "Form tidak boleh kosong";
    } else if (key === "no_kk" || key === "nik") {
      if (checkLength(value, 16)) {
        return "Form tidak boleh kurang atau lebih dari 16";
      }
    }
    return "";
  };

  const checkEmpty = (value) => {
    return value === "" || value === undefined ? true : false;
  };

  const checkLength = (value, max) => {
    return value.length < max ? true : false;
  };

  return {
    checkNotValid,
    checkNotValidAll,
    updateValid,
    messageNotValid,
    setTofalseValue,
  };
};

export default InputValidator;
