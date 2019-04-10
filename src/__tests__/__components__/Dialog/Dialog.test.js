import React from "react";
import { shallow } from "enzyme";
import Dialog from "../../../components/common/Dialog/Dialog";

const props = {
  open: true,
  "aria-labelledby": "alert-dialog-title",
  "aria-describedby": "alert-dialog-description",
  deleteProfile: jest.fn(),
  handleClose: jest.fn()
};
describe("Dialog()", () => {
  test("should trigger click event", () => {
    const component = shallow(<Dialog {...props} />);
    component
      .find("BasicButton")
      .first()
      .simulate("click");
    expect(props.deleteProfile).not.toHaveBeenCalled();
  });

  test("should call deleteProfile function", () => {
    const component = shallow(<Dialog {...props} />);
    component.find(".delete-profile").simulate("click");
    expect(props.deleteProfile).toHaveBeenCalled();
  });

  test("should call handleClickOpen function", () => {
    const component = shallow(<Dialog {...props} />);
    component.find(".danger").simulate("click");
    expect(props.open).toBe(true);
  });

  test("should call handleClose function", () => {
    const component = shallow(<Dialog {...props} />);
    component.simulate("close");
    expect(props.open).toBe(true);
  });
});
