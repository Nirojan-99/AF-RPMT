import { timeParser, dateParser } from "./TimeFormatter";

const compare = (date, time) => {
  const today = new Date();
  const due = new Date(date);

  const due_time = timeParser(time);
  const current_time = timeParser(today);

  if (due < today) {
    return false;
  } else if (due > today) {
    return true;
  } else {
    let due_array = due_time.split(":");
    let current_array = current_time.split(":");

    if (due_array[0] > current_array[0]) {
      return true;
    } else if (due_array[0] < current_array[0]) {
      return false;
    } else {
      if (due_array[1] < current_array[1]) {
        return false;
      } else if (due_array[1] > current_array[1]) {
        return true;
      } else {
        return false;
      }
    }
  }
};

export default compare;
