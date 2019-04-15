import calculateTimeStamp from "../../utils/helpers/calculateTimeStamp";

describe("time stamp calculation", () => {
  test("should return the right format of the data", () => {
    const time = "2019-04-17T08:06:06.002Z";
    expect(calculateTimeStamp(time)).toEqual("Apr  17, 2019");
  });
});
