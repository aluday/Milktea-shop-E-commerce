import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { adminRoutes, userRoutes, notAdminRoutes } from "./app-routes";
import { UserProvider } from "./providers/UserProvider";
import { OrderProvider } from "./providers/OrderProvider";

function App() {
  const currentUserInfo = JSON.parse(localStorage.getItem("current_user"));
  const appRoutes = currentUserInfo
    ? currentUserInfo.isAdmin
      ? adminRoutes
      : notAdminRoutes
    : userRoutes;

  return (
    <div>
      <UserProvider>
        <OrderProvider>
          <Router>
            <Routes>
              {appRoutes.map((route) => {
                const Page = route.page;
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={<Page />}
                  />
                );
              })}
            </Routes>
          </Router>
        </OrderProvider>
      </UserProvider>
    </div>
  );
}

export default App;
