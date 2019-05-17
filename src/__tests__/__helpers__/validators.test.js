import validator from "../../utils/validator";

describe("## Validation class", () => {
  test("should return true if a valid email is supplied", () => {
    expect(validator.isEmailValid("test@test.com")).toEqual(true);
  });

  test("should return true if an invalid password is supplied", () => {
    expect(validator.isPasswordValid("jjdjdj98756")).toEqual(true);
  });

  test("should return false if an invalid password is supplied", () => {
    expect(validator.isPasswordValid("jjdj9874")).toEqual(false);
  });

  test("should return true if a valid username is supplied", () => {
    expect(validator.isUsernameValid("jjdjdj98")).toEqual(true);
  });
});
