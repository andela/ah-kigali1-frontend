/* eslint-disable import/no-extraneous-dependencies */
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import dotenv from "dotenv";

dotenv.config();
configure({ adapter: new Adapter() });
