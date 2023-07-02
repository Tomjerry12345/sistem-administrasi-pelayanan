import { InputAdornment } from "@mui/material";
import { constantBulan } from "./Constant";

export const setIconInput = (icons, position) => {
  return {
    startAdornment: <InputAdornment position={position}>{icons}</InputAdornment>,
  };
};

export const setLocalItem = (key, value) => localStorage.setItem(key, value);

export const getLocalItem = (key) => localStorage.getItem(key);

export const log = (v, m) => {
  if (m !== undefined) {
    console.log(`[d] ${v}`, m);
  } else {
    let name, value;
    for (let varName in v) {
      name = varName;
      value = v[name];
    }

    console.log(`[d] ${name}`, value);
  }
};

export const getMonthNow = () => {
  const d = new Date();
  return constantBulan[d.getMonth()];
};

export const getYearNow = () => {
  const d = new Date();
  return d.getFullYear();
};
