import { stringToHtmlElement } from "../../utils/helpers/bodyParser";

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
