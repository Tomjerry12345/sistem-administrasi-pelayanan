import { logS } from "../values/Utilitas";

const ResultP2 = () => {
  // P0
  const rRuleA3 = [false, false];
  const rRuleB3 = [false];
  const rRuleC3 = [false, false];
  const rRuleJ3 = [false, false];
  const rRuleL3 = [false, false];

  const ruleA3 = (val) => {
    if (val === "Komputer") {
      rRuleA3[0] = true;
    }

    if (val === "Laptop") {
      rRuleA3[1] = true;
    }
  };

  const ruleB3 = (val) => {
    if (val === "Motor") {
      rRuleB3[0] = true;
    }
  };

  const ruleC3 = (val) => {
    if (val === "Sapi") {
      rRuleC3[0] = true;
    }

    if (val === "Kuda") {
      rRuleC3[1] = true;
    }
  };

  const ruleW3 = () => {
    let A3 = !rRuleA3.some((x) => x === false);
    let B3 = !rRuleB3.some((x) => x === false);
    let C3 = !rRuleC3.some((x) => x === false);

    if ((A3 && B3) || (A3 && C3) || (B3 && C3)) {
      return true;
    }

    return false;
  };

  const ruleJ3 = (val) => {
    if (val === "Semen") {
      rRuleJ3[0] = true;
    }

    if (val === "Tembok") {
      rRuleJ3[1] = true;
    }
  };

  const ruleL3 = (val) => {
    if (val === "Air isi ulang") {
      rRuleL3[0] = true;
    }

    if (val === "1300 watt") {
      rRuleL3[1] = true;
    }
  };

  const ruleY3 = () => {
    let isRuleJ3 = !rRuleJ3.some((x) => x === false);
    logS("isRuleJ3", isRuleJ3);
    if (ruleW3() && isRuleJ3) {
      return true;
    }

    return false;
  };

  const result = (val) => {
    ruleA3(val);
    ruleB3(val);
    ruleC3(val);
    ruleJ3(val);
    ruleL3(val);

    let isRuleL3 = !rRuleL3.some((x) => x === false);

    logS("isRuleL3", isRuleL3);
    logS("ruleY3()", ruleY3());

    if (ruleY3() || isRuleL3) {
      return true;
    }

    return false;
  };

  return { result };
};

export default ResultP2;
