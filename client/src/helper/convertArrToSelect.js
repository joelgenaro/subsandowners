const convertArrToSelect = (codes) => {
  const states = codes.map((stateCode) => {
    return { value: stateCode, label: stateCode };
  });

  return states;
};

export default convertArrToSelect;
