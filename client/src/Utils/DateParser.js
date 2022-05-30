//date parser
const dateParser = (val) => {
  const date = new Date(val);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export { dateParser };
