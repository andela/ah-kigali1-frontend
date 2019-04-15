import ReactHtmlParser from "react-html-parser";

export const stringToHtmlElement = text => {
  const body = ReactHtmlParser(text);
  let firstImage = "https://picsum.photos/200/300/?random";
  const imageRegEx = /<img .*?>/g;

  const images = text.match(imageRegEx);
  if (images && images.length) {
    const oneImage = images[0].match(/src\s*=\s*"(.+?)"/);
    [firstImage, , ,] = oneImage[0].match(/(["'])(?:(?=(\\?))\2.)*?\1/);
  }
  return { body, firstImage };
};
