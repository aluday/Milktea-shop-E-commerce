import { HomePage } from "./components/user/home/Home";
import { AdminPage } from "./components/admin/Admin";
import { SigninPage } from "./components/user/account/Signin";
import { SignupPage } from "./components/user/account/Signup";
import { Profile } from "./components/user/account/Profile";
import { PaymentDetails } from "./components/user/payment/PaymentDetails";
import { ProductDetails } from "./components/user/home/ProductDetails";
import { NotFound } from "./components/user/error-pages/NotFound";

export const adminRoutes = [
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
    path: "/product-details",
    page: ProductDetails,
  },
  {
    path: "/system/admin",
    page: AdminPage,
  },
  {
    path: "*",
    page: NotFound,
  },
];

// routes for user logged in but doesn't admin user
export const notAdminRoutes = [
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
    path: "/product-details",
    page: ProductDetails,
  },
  {
    path: "*",
    page: NotFound,
  },
];

// routes for user doesn't login
export const userRoutes = [
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
    path: "*",
    page: NotFound,
  },
];
