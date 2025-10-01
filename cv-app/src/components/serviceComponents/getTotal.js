const getTotal = (classList) => {
  const Array = [];
  const Items = document.getElementsByClassName(classList);
  //
  for (let item of Items) {
    Array.push(parseFloat(item.innerHTML));
  }
  const initialValue = 0;
  const result = Array.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  ).toFixed(2);
  //   setTotalHours(result);

  return result;
};

export default getTotal;
