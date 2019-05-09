import React from "react";
import { shallow } from "enzyme";
import { Route } from "react-router-dom";
import Routes from "../views";
import AuthRoutes from "../views/routes/AuthRoutes";
import MainRoutes, { routes } from "../views/routes/MainRoutes";
import Navbar from "../components/common/AppBars/Navbar";

const wrapperAuth = shallow(<Routes />);
let allPaths = [];
const wrapperMain = shallow(<MainRoutes />);
describe("All routes", () => {
  beforeEach(() => {
    allPaths = [
      ...allPaths,
      ...wrapperAuth.find(Route).map(route => route.props().path),
      ...wrapperMain.find(Route).map(route => route.props().path)
    ];
  });
  test("should return all authentication routers", () => {
    AuthRoutes.forEach(route => expect(allPaths).toContain(route.path));
  });
  test("should include all route and navbar on main routers", () => {
    expect(wrapperMain.find(Navbar).length).toBe(1);
    routes.forEach(route => expect(allPaths).toContain(route.path));
  });
});
