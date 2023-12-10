import Login from "./components/login";
import ChangePassword from "./components/change-password";

export const routes: any = [
  {
    name: "login",
    title: "LogIn",
    component: Login,
    path: "/user/login",
  },
  {
    name: "change-password",
    title: "Change Password",
    component: ChangePassword,
    path: "/user/change-password",
  },
];
