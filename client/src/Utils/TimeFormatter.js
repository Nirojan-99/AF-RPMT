//date parser
const dateParser = (val) => {
  const date = new Date(val);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

//time parser
const timeParser = (val) => {
  const date = new Date(val);
  let hour = date.getHours();
  let minute = date.getMinutes();

  hour = hour.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  minute = minute.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  return `${hour}:${minute}`;
};

export { timeParser, dateParser };
