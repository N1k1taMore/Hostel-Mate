import Login from "./pages/Login";
import Register from "./pages/Register";
import Leave from "./pages/Leave";
import WardenLeave from "./pages/WardenLeave";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RoutesPathName } from "./constants";
import PrivateRoute from "./utils/PrivateRoute";
import AccountPage from "./pages/AccountPage";
import Admission from "./pages/Admission";
import ResidentData from "./pages/ResidentData";

const routes = createBrowserRouter([
  {
    path: RoutesPathName.SIGNUP_PAGE,
    index: true,
    Component: Register,
  },
  {
    path: RoutesPathName.LOGIN_PAGE,
    element: <Login />,
  },
  {
    path: RoutesPathName.ACCOUNT,
    element: <AccountPage />,
  },
  {
    path: RoutesPathName.DASHBOARD_PAGE,
    element: <PrivateRoute />,
  },
  {
    path: RoutesPathName.LEAVE,
    element: <Leave/>,
  },
  {
    path: RoutesPathName.WARDENLEAVE,
    element: <WardenLeave/>,
  },
  {
    path: RoutesPathName.ADMISSION,
    element: <Admission/>,
  },
  {
    path: RoutesPathName.RESIDENTDATA,
    element:<ResidentData/>
  },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
