import { HomePage } from "./components/user/home/Home";
import { AdminPage } from "./components/admin/Admin";
import { SigninPage } from "./components/user/account/Signin";
import { SignupPage } from "./components/user/account/Signup";
import { Profile } from "./components/user/account/Profile";
import { PaymentDetails } from "./components/user/payment/PaymentDetails";

export const appRoutes = [
  {
    path: "/",
    page: HomePage,
  },
  {
    path: "/sign-up",
    page: SignupPage,
  },
  {
    path: "/sign-in",
    page: SigninPage,
  },
  {
    path: "/profile",
    page: Profile,
  },
  {
    path: "/payment",
    page: PaymentDetails,
  },
  {
    path: "/system/admin",
    page: AdminPage,
  },
];
