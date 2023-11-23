import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { appRoutes } from "./app-routes";
import { UserProvider } from "./providers/UserProvider";
import { OrderProvider } from "./providers/OrderProvider";

function App() {
  return (
    <div>
      <UserProvider>
        <OrderProvider>
          <Router>
            <Routes>
              {appRoutes.map((route) => {
                const Page = route.page;
                return (
                  <Route key={route.path} path={route.path} element={<Page />} />
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
