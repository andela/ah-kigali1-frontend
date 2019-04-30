import Login from "../Login";
import SocialAuth from "../SocialAuth";
import ResetPassword from "../ResetPassword";
import UpdatePassword from "../UpdatePassword";

const AuthRoutes = [
  {
    path: "/sign_in",
    component: Login
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
