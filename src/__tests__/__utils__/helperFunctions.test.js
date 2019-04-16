import { isEmpty, capitalize } from "../../utils/helperFunctions";

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
});
