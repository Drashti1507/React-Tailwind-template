// import { Routes, Route } from "react-router-dom";
// import { Cog6ToothIcon } from "@heroicons/react/24/solid";
// import { IconButton } from "@material-tailwind/react";
// import {
//   Sidenav,
//   DashboardNavbar,
//   Configurator,
//   Footer,
// } from "@/widgets/layout";
// import routes from "@/routes";
// import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
// import { Navigate } from "react-router-dom";
// import { isAuthenticated } from "@/utils/auth";

// export function Dashboard() {
//   const [controller, dispatch] = useMaterialTailwindController();
//   const { sidenavType } = controller;
//   if (!isAuthenticated()) {
//     return <Navigate to="/auth/sign-in" replace />;
//   }

//   return (
//     <div className="min-h-screen bg-blue-gray-50/50">
//       {/* <Sidenav
//         routes={routes} */}
//         <Sidenav routes={dashboardRoutes}
//         brandImg={
//           sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
//         }
//       />
//       <div className="p-4 xl:ml-80">
//         <DashboardNavbar />
//         <Configurator />
//         <IconButton
//           size="lg"
//           color="white"
//           className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
//           ripple={false}
//           onClick={() => setOpenConfigurator(dispatch, true)}
//         >
//           <Cog6ToothIcon className="h-5 w-5" />
//         </IconButton>
//         <Routes>
//           {routes.map(
//             ({ layout, pages }) =>
//               layout === "dashboard" &&
//               pages.map(({ path, element }) => (
//                 <Route exact path={path} element={element} />
//               ))
//           )}
//         </Routes>
//         <div className="text-blue-gray-600">
//           <Footer />
//         </div>
//       </div>
//     </div>
//   );
// }
// const dashboardRoutes = routes.filter(r => r.layout === "dashboard");
// Dashboard.displayName = "/src/layout/dashboard.jsx";

// export default Dashboard;

import { Routes, Route, Navigate } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
// import { isAuthenticated } from "@/utils/auth";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  // protect dashboard
  // if (!isAuthenticated()) {
  //   return <Navigate to="/auth/sign-in" replace />;
  // }

  //  only dashboard routes for sidebar + routing
  const dashboardRoutes = routes.filter(r => r.layout === "dashboard");

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={dashboardRoutes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />

      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />

        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>

        <Routes>
          {dashboardRoutes[0].pages.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>

        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";
export default Dashboard;
