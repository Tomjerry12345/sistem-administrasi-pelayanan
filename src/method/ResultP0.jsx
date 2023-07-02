const ResultP0 = () => {
  // P0
  const rRuleA1 = [false, false];
  const rRuleB1 = [false];
  const rRuleC1 = [false, false];
  const rRuleJ1 = [false, false];
  const rRuleL1 = [false, false];

  const ruleA1 = (val) => {
    if (val === "Tabung") {
      rRuleA1[0] = true;
    }

    if (val === "Hp") {
      rRuleA1[1] = true;
    }
  };

  const ruleB1 = (val) => {
    if (val === "Sepeda") {
      rRuleB1[0] = true;
    }
  };

  const ruleC1 = (val) => {
    if (val === "Kambing") {
      rRuleC1[0] = true;
    }

    if (val === "Babi") {
      rRuleC1[1] = true;
    }
  };

  const ruleW1 = () => {
    let A1 = !rRuleA1.some((x) => x === false);
    let B1 = !rRuleB1.some((x) => x === false);
    let C1 = !rRuleC1.some((x) => x === false);

    // logS("A1", A1);
    // logS("B1", B1);
    // logS("C1", C1);

    if ((A1 && B1) || (A1 && C1) || (B1 && C1)) {
      return true;
    }

    return false;
  };

  const ruleJ1 = (val) => {
    if (val === "Bambu") {
      rRuleJ1[0] = true;
    }

    if (val === "Anyaman bambu") {
      rRuleJ1[1] = true;
    }
  };

  const ruleL1 = (val) => {
    if (val === "Air sungai") {
      rRuleL1[0] = true;
    }

    if (val === "450 watt") {
      rRuleL1[1] = true;
    }
  };

  const ruleY1 = () => {
    let isRuleJ1 = !rRuleJ1.some((x) => x === false);
    if (ruleW1() && isRuleJ1) {
      return true;
    }

    return false;
  };

  const result = (val) => {
    ruleA1(val);
    ruleB1(val);
    ruleC1(val);
    ruleJ1(val);
    ruleL1(val);

    let isRuleL1 = !rRuleL1.some((x) => x === false);

    if (ruleY1() || isRuleL1) {
      return true;
    }

    return false;
  };

  return { result };
};

export default ResultP0;
