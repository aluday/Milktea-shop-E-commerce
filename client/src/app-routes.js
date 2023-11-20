import { HomePage } from "./components/user/home/Home";
import { AdminPage } from "./components/admin/Admin";
import { SigninPage } from "./components/user/account/Signin";
import { SignupPage } from "./components/user/account/Signup";
import { Profile } from './components/user/account/Profile';

export const appRoutes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/sign-up",
    page: SignupPage,
    isShowHeader: false,
  },
  {
    path: "/sign-in",
    page: SigninPage,
    isShowHeader: false,
  },
  {
    path: "/profile",
    page: Profile,
    isShowHeader: true
  },
  {
    path: "/system/admin",
    page: AdminPage,
    isShowHeader: false,
    isPrivate: true,
  },
];
