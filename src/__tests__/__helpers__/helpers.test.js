import { fieldRemover, nullRemover } from "../../helpers/helpers";
import { initialState } from "../testData";

describe("helpers", () => {
  test("should remove nulls", () => {
    const filteredObject = nullRemover(initialState);
    expect(filteredObject).toHaveProperty("email");
  });

  test("should remove not allowed fields", () => {
    const filteredObject = fieldRemover(initialState);
    expect(filteredObject).toHaveProperty("username");
  });
});
