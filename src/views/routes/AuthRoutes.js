import Login from "../Login";
import SocialAuth from "../SocialAuth";
import ResetPassword from "../ResetPassword";
import UpdatePassword from "../UpdatePassword";
import SignUpComponent from "../SignUp";

const AuthRoutes = [
  {
    path: "/sign_in",
    component: Login
  },
  {
    path: "/sign_up",
    component: SignUpComponent
  },
  {
    path: "/social_auth",
    component: SocialAuth
  },
  {
    path: "/reset_password",
    component: ResetPassword
  },
  {
    path: "/update_password",
    component: UpdatePassword
  }
];
export default AuthRoutes;
