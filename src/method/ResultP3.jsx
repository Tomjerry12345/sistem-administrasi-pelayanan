const ResultP0 = () => {
  // P0
  const rRuleA4 = [false, false];
  const rRuleB4 = [false, false, false];
  const rRuleC4 = [false, false];
  const rRuleJ4 = [false, false];
  const rRuleL4 = [false, false];

  const ruleA4 = (val) => {
    if (val === "Emas") {
      rRuleA4[0] = true;
    }

    if (val === "Ac") {
      rRuleA4[1] = true;
    }
  };

  const ruleB4 = (val) => {
    if (val === "Mobil") {
      rRuleB4[0] = true;
    }

    if (val === "Perahu") {
      rRuleB4[1] = true;
    }

    if (val === "Kapal") {
      rRuleB4[2] = true;
    }
  };

  const ruleC4 = (val) => {
    if (val === "Lahan lain") {
      rRuleC4[0] = true;
    }

    if (val === "Rumah lain") {
      rRuleC4[1] = true;
    }
  };

  const ruleW4 = () => {
    let A1 = !rRuleA4.some((x) => x === false);
    let B1 = !rRuleB4.some((x) => x === false);
    let C1 = !rRuleC4.some((x) => x === false);

    // logS("A1", A1);
    // logS("B1", B1);
    // logS("C1", C1);

    if ((A1 && B1) || (A1 && C1) || (B1 && C1)) {
      return true;
    }

    return false;
  };

  const ruleJ4 = (val) => {
    if (val === "Tegel") {
      rRuleJ4[0] = true;
    }

    if (val === "Tembok") {
      rRuleJ4[1] = true;
    }
  };

  const ruleL4 = (val) => {
    if (val === "Air kemasan ber merk") {
      rRuleL4[0] = true;
    }

    if (val === ">= 2220 watt") {
      rRuleL4[1] = true;
    }
  };

  const ruleY4 = () => {
    let isRuleJ4 = !rRuleJ4.some((x) => x === false);
    if (ruleW4() && isRuleJ4) {
      return true;
    }

    return false;
  };

  const result = (val) => {
    ruleA4(val);
    ruleB4(val);
    ruleC4(val);
    ruleJ4(val);
    ruleL4(val);

    let isRuleL4 = !rRuleL4.some((x) => x === false);

    if (ruleY4() || isRuleL4) {
      return true;
    }

    return false;
  };

  return { result };
};

export default ResultP0;
