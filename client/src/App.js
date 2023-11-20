import "./App.css";
import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { appRoutes } from "./app-routes";
import Default from './components/shared-components/Default';
import { UserProvider } from './providers/UserProvider';

function App() {
  return (
    <div>
      <UserProvider>
        <Router>
          <Routes>
            {appRoutes.map((route) => {
              const Page = route.page;
              const Layout = route.isShowHeader ? Default : Fragment;
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
