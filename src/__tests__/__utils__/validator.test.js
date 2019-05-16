import Validator from "../../utils/validator";

describe("Validator Class", () => {
  test("should validator formData", () => {
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

  test("should validate matching of two values", () => {
    expect(Validator.isMatch("password", "1234", "1234ad")).toEqual({
      message: "Your passwords  do not match!"
    });
    expect(Validator.isMatch("password", "1234", "1234")).toEqual({});
  });

  it("should validate new article", () => {
    expect(
      Validator.newArticleValidation({
        title: "hello",
        body: "hello world",
        description: "hello world"
      })
    ).toEqual("Title should be more than 10 characters long");
    expect(
      Validator.newArticleValidation({
        title: "hello world",
        body: "hello world",
        description: "hello"
      })
    ).toEqual("Description should be more than 10 characters long");
    expect(
      Validator.newArticleValidation({
        title: "hello world",
        body: "hello world",
        description: "hello world"
      })
    ).toEqual("Body should be more than 100 words");
  });
});
