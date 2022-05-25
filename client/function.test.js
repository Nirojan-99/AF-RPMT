import compare from "./src/Utils/TimeCompare";
import { timeParser, dateParser } from "./src/Utils/TimeFormatter";

describe("./src/Utils/TimeCompare", () => {
  const pastDate = "Sun May 23 2022 12:39:51 GMT+0530 (India Standard Time)";
  test("compare dates and give true if the given date is future", () => {
    expect(compare(pastDate, pastDate)).toBe(true);
  });
});

describe("./src/Utils/TimeFormatter", () => {
  const pastDate = "Tue May 31 2022 17:34:10 GMT+0530 (India Standard Time)";
  test("parse the date", () => {
    expect(dateParser(pastDate)).toBe("31/5/2022");
  });
});

describe("./src/Utils/TimeFormatter", () => {
  const pastDate = "Tue May 31 2022 17:34:10 GMT+0530 (India Standard Time)";
  test("parse the time", () => {
    expect(timeParser(pastDate)).toBe("17:34");
  });
});


