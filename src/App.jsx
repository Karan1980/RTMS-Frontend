import React, { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import AppSk from "./components/Skeletons/AppSk.jsx";
import OtpSignUp from "./Pages/Signup/OtpSignup.jsx";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./apis/PrivateRoutes.jsx";

// Lazy loaded componentes in lazy
const Home = lazy(() => import("./Pages/Dashboard/Home/Home.jsx"));
const Login = lazy(() => import("./Pages/Login/Login.jsx"));
const Signup = lazy(() => import("./Pages/Signup/Signup.jsx"));
const Dashboard = lazy(() => import("./Pages/Dashboard/index.jsx"));
const Forgot = lazy(() => import("./Pages/Forgot/Forgot.jsx"));
const Reset = lazy(() => import("./components/Reset/Reset.jsx"));
const Virtual = lazy(() => import("./Pages/Dashboard/Virtual/Virtual.jsx"));
const Monitor = lazy(() => import("./Pages/Dashboard/Monitor/Monitor.jsx"));
const Crystal = lazy(() => import("./Pages/Dashboard/Crystal/Crystal.jsx"));
const ComplaintHistory = lazy(() =>
  import("./Pages/Dashboard/ComplaintHistory/ComplaintHistory.jsx")
);
const NotificationHistory = lazy(() =>
  import("./Pages/Dashboard/NotificationHistory/NotificationHistory.jsx")
);
const Edit = lazy(() => import("./Pages/Dashboard/Edit/Edit.jsx"));
const Logout = lazy(() => import("./Pages/Dashboard/Logout/Logout.jsx"));
const PopUp = lazy(() => import("./CheckStatus/PopUp.jsx"));
const CheckStatus = lazy(() => import("./CheckStatus/CheckStatus.jsx"));
const Otp = lazy(() => import("./Pages/Login/Otp.jsx"));
const WellMaster = lazy(() => import("./Pages/WellMaster/WellMaster.jsx"));
const SingleWell = lazy(() =>
  import("./Pages/Dashboard/SingleWell/SingleWell.jsx")
);
const AddWell = lazy(() => import("./Pages/WellMaster/AddWell/AddWell.jsx"));
const ManageAsset = lazy(() =>
  import("./Pages/Dashboard/ManageAsset.jsx/ManageAsset.jsx")
);
const DeviceManage = lazy(() =>
  import("./Pages/Dashboard/DeviceManage/DeviceManage.jsx")
);
const AddDevice = lazy(() =>
  import("./Pages/Dashboard/DeviceManage/AddDevice/AddDevice.jsx")
);
const Network = lazy(() => import("./Pages/Dashboard/Network/Network.jsx"));
const AddDevices = lazy(() =>
  import("./Pages/Dashboard/Network/AddNetwork/AddNetwork.jsx")
);
const Approval = lazy(() =>
  import("./Pages/Dashboard/MessageBox/Approval.jsx")
);
const SuperAdmin = lazy(() =>
  import("./Pages/Dashboard/SuperAdmin/SuperAdmin.jsx")
);

const TechnicalSupport = lazy(() =>
  import("./Pages/Dashboard/TechnicalSupport/TechnicalSupport.jsx")
);
const Lora = lazy(() =>
  import("./Pages/Dashboard/DeviceManage/Lora.jsx")
);

const MesaageForwarding = lazy(() =>
  import("./Pages/Dashboard/MessageForwarding.jsx")
);

const CheckOrganization = lazy(() =>
  import("./Pages/Dashboard/SuperAdmin/CheckOrganization.jsx")
);

const Simulator = lazy(() =>
  import("./Pages/Dashboard/DeviceManage/Simulator.jsx")
);

const LoraNetwork = lazy(() =>
  import("./Pages/Dashboard/LoraNetwork.jsx")
);



function App() {
  const role = useSelector((state) => state.auth.role);

  // Define common routes (visible to everyone)
  const commonRoutes = [
    { path: "", element: <Home /> },
    { path: "monitor", element: <Monitor /> },
    { path: "virtual", element: <Virtual /> },
    { path: "crystal", element: <Crystal /> },
    { path: "complaint", element: <ComplaintHistory /> },
    { path: "notification", element: <NotificationHistory /> },
    { path: "edit", element: <Edit /> },
    { path: "logout", element: <Logout /> },
    { path: "wellmaster", element: <WellMaster /> },
    { path: "addwell", element: <AddWell /> },
    { path: "singlewell", element: <SingleWell /> },
    { path: "DeviceManage", element: <DeviceManage /> },
    { path: "AddDevice", element: <AddDevice /> },
    { path: "Lora", element: <Lora /> },
    { path: "Network", element: <Network /> },
    { path: "AddDevices", element: <AddDevices /> },
    { path: "simulator", element: <Simulator /> },

    { path: "Admin", element: <SuperAdmin /> },
    { path: "technicalSupport", element: <TechnicalSupport /> },
    { path: "MesaageForwarding", element: <MesaageForwarding /> },
    { path: "LoraNetwork", element: <LoraNetwork /> },

  ];

  // Add role-specific routes
  if (role === "owner") {
    commonRoutes.push(
      { path: "ManageAsset", element: <ManageAsset /> },
      { path: "message", element: <Approval /> }
    );
  } else if (role === "manager") {
    commonRoutes.push({ path: "message", element: <Approval /> });

    // } else if (role === "admin") {
    //   // Admin sees only the admin route
    //   // commonRoutes.length = 0; // Clear the commonRoutes
    //   // commonRoutes.push({ path: "", element: <SuperAdmin /> }); // Only admin route
  } else if (role === "employee") {
    // Employee does not see "ManageAsset" and "message" amd "Super Admin"

  }

  // Configure the routes with children under "/dashboard"
  const route = useRoutes([
    { path: "admin", element: <SuperAdmin /> },
    { path: "/", element: <Login /> },
    { path: "/otp", element: <Otp /> },
    { path: "/signup", element: <Signup /> },
    { path: "/otpsignup", element: <OtpSignUp /> },
    { path: "/forgot", element: <Forgot /> },
    { path: "/reset", element: <Reset /> },
    { path: "/popup", element: <PopUp /> },
    { path: "/CheckStatus", element: <CheckStatus /> },
    { path: "/checkOrganization", element: <CheckOrganization /> },
    {
      path: "/dashboard",
      element: <PrivateRoute />,
      children: [ 
        {
          path: "",
          element: <Dashboard />,
          children: commonRoutes,
        },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer position="top-center" autoClose={5000} />
      <Suspense fallback={<AppSk />}>{route}</Suspense>
    </>
  );
}

// function App() {
//   // Fetch the role from Redux
//   const role = useSelector((state) => state.auth.role);

//   // Define common routes (visible to all roles)
//   const commonRoutes = [
//     { path: "", element: <Home /> },
//     { path: "monitor", element: <Monitor /> },
//     { path: "virtual", element: <Virtual /> },
//     { path: "crystal", element: <Crystal /> },
//     { path: "complaint", element: <ComplaintHistory /> },
//     { path: "notification", element: <NotificationHistory /> },
//     { path: "edit", element: <Edit /> },
//     { path: "logout", element: <Logout /> },
//     { path: "wellmaster", element: <WellMaster /> },
//     { path: "addwell", element: <AddWell /> },
//     { path: "singlewell", element: <SingleWell /> },
//     { path: "DeviceManage", element: <DeviceManage /> },
//     { path: "AddDevice", element: <AddDevice /> },
//     { path: "Network", element: <Network /> },
//     { path: "AddDevices", element: <AddDevices /> },
//     { path: "technicalSupport", element: <TechnicalSupport /> },
//   ];

//   // Add role-specific routes
//   if (role === "owner") {
//     // Owner sees all routes including ManageAsset and message
//     commonRoutes.push(
//       { path: "ManageAsset", element: <ManageAsset /> },
//       { path: "message", element: <Approval /> }
//     );
//   } else if (role === "manager") {
//     // Manager sees all routes except "ManageAsset"
//     commonRoutes.push({ path: "message", element: <Approval /> });
//   } else if (role === "admin") {
//     // Admin is redirected to a dedicated admin page
//     return useRoutes([
//       { path: "/", element: <Navigate to="/admin" /> },
//       { path: "/admin", element: <SuperAdmin /> },
//     ]);
//   }

//   // Configure routes for all other roles (e.g., employee, owner, etc.)
//   return useRoutes([
//     { path: "/", element: <Login /> },
//     { path: "/otp", element: <Otp /> },
//     { path: "/signup", element: <Signup /> },
//     { path: "/otpsignup", element: <OtpSignUp /> },
//     { path: "/forgot", element: <Forgot /> },
//     { path: "/reset", element: <Reset /> },
//     { path: "/popup", element: <PopUp /> },
//     { path: "/CheckStatus", element: <CheckStatus /> },
//     {
//       path: "/dashboard",
//       element: <PrivateRoute />, // Protect the dashboard route
//       children: [
//         {
//           path: "",
//           element: <Dashboard />,
//           children: commonRoutes,
//         },
//       ],
//     },
//   ]);
// }

export default App;
