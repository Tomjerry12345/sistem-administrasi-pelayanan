import { logO, logS } from "../values/Utilitas";
import ResultP0 from "./ResultP0";
import ResultP1 from "./ResultP1";
import ResultP2 from "./ResultP2";

const testing = [
  "Tabung",
  "Hp",
  "Sepeda",
  "Kambing",
  "Babi",
  "Bambu",
  "Anyaman bambu",
  "Air sungai",
  "450 watt",
];
const testing1 = ["Tv", "Kulkas", "Kayu", "Papan", "Sumur pribadi", "900 watt"];
const testing2 = [
  "Komputer",
  "Laptop",
  "Motor",
  "Sapi",
  "Kuda",
  "Semen",
  "Tembok",
  "Air isi ulang",
  "1300 watt",
];

const ForwardChaining = () => {
  const clasify = (data) => {
    logO("data", data);
    let result = "";
    const p0 = ResultP0();
    const p1 = ResultP1();
    const p2 = ResultP2();
    data.forEach((val) => {
      if (p0.result(val)) {
        result = "P0";
      } else if (p1.result(val)) {
        result = "P1";
      } else if (p2.result(val)) {
        result = "P2";
      } else {
        result = "P3";
      }
    });
    // logS("result", result);
    return result;
  };

  return {
    clasify,
  };
};

export default ForwardChaining;
