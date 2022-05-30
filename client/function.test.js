import { timeParser, dateParser } from "./src/Utils/TimeFormatter";
import TimeRemains from "./src/Utils/TimeRemains";

describe("./src/Utils/TimeFormatter", () => {
  const pastDate = "Tue May 31 2022 17:34:10 GMT+0530 (India Standard Time)";
  test("parse the date", () => {
    expect(dateParser(pastDate)).toBe("5/31/2022");
  });
});

describe("./src/Utils/TimeFormatter", () => {
  const pastDate = "Tue May 31 2022 17:34:10 GMT+0530 (India Standard Time)";
  test("parse the date", () => {
    expect(dateParser(pastDate)).not.toBe("05/31/2022");
  });
});

describe("./src/Utils/TimeFormatter", () => {
  const pastDate = "Sat May 28 2022 23:00:00 GMT+0530 (India Standard Time)";
  test("parse the time", () => {
    expect(timeParser(pastDate)).toBe("23:00");
  });
});

describe("./src/Utils/TimeFormatter", () => {
  const pastDate = "Sat May 28 2022 23:01:00 GMT+0530 (India Standard Time)";
  test("parse the time", () => {
    expect(timeParser(pastDate)).not.toBe("23:1");
  });
});

describe("./src/Utils/TimeRemains", () => {
  const date = "Sat May 28 2022 23:01:00 GMT+0530 (India Standard Time)";
  const time = "Sat May 28 2022 23:01:00 GMT+0530 (India Standard Time)";

  test("text past date", () => {
    expect(TimeRemains(date, time)).toBe(false);
  });
});

describe("./src/Utils/TimeRemains", () => {
  //change data accordingly
  const date = "5/31/2022";
  const time = "13:56";

  test("test fulure date", () => {
    expect(TimeRemains(date, time)).not.toBe(false);
  });
});
