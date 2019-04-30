import React from "react";
import { shallow } from "enzyme";
import { MainCard } from "../../../components/common/Cards/main";

import { mainCardProps1, mainCardProps2 } from "../../__mocks__/testData";

describe("main card ", () => {
  test("should render one main card with firstName lastName", () => {
    const wrapper = shallow(<MainCard {...mainCardProps1} />);
    expect(wrapper.find(".article-card")).toHaveLength(1);
  });

  test("should render one main card without firstName, and lastNamve", () => {
    const wrapper = shallow(<MainCard {...mainCardProps2} />);
    expect(wrapper.find(".article-card")).toHaveLength(1);
  });

  test("should render one main card without firstName, and lastNamve", () => {
    const wrapper = shallow(<MainCard {...mainCardProps1} />);
    wrapper.find(".left").simulate("click");
    expect(mainCardProps1.history.push).toHaveBeenCalled();
    expect(wrapper.find(".left")).toHaveLength(1);
  });
});
