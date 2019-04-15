/* eslint-disable import/no-extraneous-dependencies */
import dotenv from "dotenv";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

dotenv.config();
configure({ adapter: new Adapter() });
