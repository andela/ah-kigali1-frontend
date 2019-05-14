import React from "react";
import { shallow } from "enzyme";
import Dialog from "../../../components/common/Dialog/DeleteDialogue";

const props = {
  open: true,
  "aria-labelledby": "alert-dialog-title",
  "aria-describedby": "alert-dialog-description",
  deleteComment: jest.fn(),
  handleClose: jest.fn()
};

describe("Dialog()", () => {
  test("should trigger click event", () => {
    const component = shallow(<Dialog {...props} />);
    component
      .find("BasicButton")
      .first()
      .simulate("click");
    expect(props.deleteComment).not.toHaveBeenCalled();
  });

  test("should call deleteComment function", () => {
    const component = shallow(<Dialog {...props} />);
    component.find("#delete-profile").simulate("click");
    expect(props.deleteComment).toHaveBeenCalled();
  });

  test("should call handleClickOpen function", () => {
    const component = shallow(<Dialog {...props} />);
    component.find(".delete-comment").simulate("click");
    expect(props.open).toBe(true);
  });

  test("should call handleClose function", () => {
    const component = shallow(<Dialog {...props} />);
    component.simulate("close");
    expect(props.open).toBe(true);
  });
});
