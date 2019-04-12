import Validator from "../../utils/validator";

describe("Validator Class", () => {
  it("should validator formData", () => {
    const validFormData = {
      email: "me@example.com",
      password: "password"
    };
    const invalidFormData = {
      email: "",
      password: ""
    };
    expect(Validator.formData(validFormData)).toEqual({});
    expect(Validator.formData(invalidFormData)).toEqual({
      email: "Email is required",
      password: "Password is required"
    });
  });
});
