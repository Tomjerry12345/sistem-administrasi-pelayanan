const ResultP1 = () => {
  const rRuleA2 = [false, false];
  const rRuleJ2 = [false, false];
  const rRuleL2 = [false, false];

  const ruleA2 = (val) => {
    if (val === "Tv") {
      rRuleA2[0] = true;
    }

    if (val === "Kulkas") {
      rRuleA2[1] = true;
    }
  };

  const ruleJ2 = (val) => {
    if (val === "Kayu") {
      rRuleJ2[0] = true;
    }

    if (val === "Papan") {
      rRuleJ2[1] = true;
    }
  };

  const ruleL2 = (val) => {
    if (val === "Sumur pribadi") {
      rRuleL2[0] = true;
    }

    if (val === "900 watt") {
      rRuleL2[1] = true;
    }
  };

  const ruleW2 = () => {
    let A2 = !rRuleA2.some((x) => x === false);
    let J2 = !rRuleJ2.some((x) => x === false);

    // logS("A1", A1);
    // logS("B1", B1);
    // logS("C1", C1);

    if (A2 && J2) {
      return true;
    }

    return false;
  };

  const result = (val) => {
    ruleA2(val);
    ruleJ2(val);
    ruleL2(val);

    let isRuleL2 = !rRuleL2.some((x) => x === false);

    if (ruleW2() || isRuleL2) {
      return true;
    }

    return false;
  };

  return {
    result,
  };
};

export default ResultP1;
