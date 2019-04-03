import validator from "../../utils/validator";

describe("## Validation class", () => {
  it("should return true if a valid email is supplied", () => {
    expect(validator.isEmailValid("test@test.com")).toEqual(true);
  });

  it("should return true if an invalid password is supplied", () => {
    expect(validator.isPasswordValid("jjdjdj98756")).toEqual(true);
  });

  it("should return false if an invalid password is supplied", () => {
    expect(validator.isPasswordValid("jjdj9874")).toEqual(false);
  });

  it("should return true if a valid username is supplied", () => {
    expect(validator.isUsernameValid("jjdjdj98")).toEqual(true);
  });
});
