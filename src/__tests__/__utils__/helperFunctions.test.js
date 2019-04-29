import {
  isEmpty,
  capitalize,
  stringToHtmlElement,
  calculateTimeStamp,
  isCurrentUserAuthor
} from "../../utils/helperFunctions";

describe("Helper Functions", () => {
  describe("isEmpty validator", () => {
    it("returns isEmpty true", () => {
      expect(isEmpty("")).toBe(true);
      expect(isEmpty({})).toBe(true);
      expect(isEmpty([])).toBe(true);
      expect(isEmpty()).toBe(true);
      expect(isEmpty(null)).toBe(true);
    });
  });
  describe("capitalize", () => {
    it("should capitalize the first letter", () => {
      expect(capitalize("luc")).toBe("Luc");
      expect(capitalize("luc abayo")).toBe("Luc abayo");
      expect(capitalize(1)).toBe(1);
    });
  });

  describe("rendering html text from plain text", () => {
    test("should render the image", () => {
      const text = `<div><p>Hello world</p><img src="https://picsum.photos/200/300/?random" /></div>`;
      const htmlElement = stringToHtmlElement(text);
      expect(htmlElement).toHaveProperty("body");
      expect(htmlElement).toHaveProperty(
        "firstImage",
        `"https://picsum.photos/200/300/?random"`
      );
    });
  });
  describe("time stamp calculation", () => {
    test("should return the right format of the data", () => {
      const time = "2019-04-17T08:06:06.002Z";
      expect(calculateTimeStamp(time)).toEqual("Wed Apr 17 2019");
    });
  });
  describe("checking current user ", () => {
    test("should return true when current user is the same as author", () => {
      expect(isCurrentUserAuthor("Iraguha1", { username: "Iraguha1" })).toEqual(
        true
      );
    });
    test("should return false when current user is different from author", () => {
      expect(isCurrentUserAuthor("Iraguha1", { username: "yves" })).toEqual(
        false
      );
    });
  });
});
