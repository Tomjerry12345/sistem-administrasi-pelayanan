import { kusioner } from "../values/Constant";
import { logO, logS } from "../values/Utilitas";

const ForwardChainingNew = () => {
  const clasify = (data) => {
    logO("data", data);
    let bobot = 0;
    let result = "";
    data.forEach((val) => {
      bobot += kusioner[val];
    });
    logS("bobot", bobot);

    if (bobot <= 21) {
      result = "P0";
    } else if (bobot >= 22 && bobot <= 25) {
      result = "P1";
    } else if (bobot >= 30 && bobot <= 49) {
      result = "P2";
    } else if (bobot >= 50 && bobot <= 165) {
      result = "P3";
    }

    return result;
  };

  return {
    clasify,
  };
};

export default ForwardChainingNew;
