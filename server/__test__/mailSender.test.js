const { mailSender } = require("../Utils/mailSender");

describe("sending mail", () => {
  const to = "nirojan.yoga@gmail.com";
  const subject = "hey, just for test";
  const message = "testing 3";

  test("send mail to valid enail", async () => {
    const val = await mailSender(to, subject, message);
    expect(val).toBe(undefined);
  });
});
