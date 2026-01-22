// import { Routes, Route } from "react-router-dom";
// import {
//   ChartPieIcon,
//   UserIcon,
//   UserPlusIcon,
//   ArrowRightOnRectangleIcon,
// } from "@heroicons/react/24/solid";
// import { Navbar, Footer } from "@/widgets/layout";
// import routes from "@/routes";
// // import { getRoutes } from "@/routes";


// export function Auth() {
// // const routes = getRoutes();

//   const navbarRoutes = [
//     {
//       name: "dashboard",
//       path: "/dashboard/home",
//       icon: ChartPieIcon,
//     },
//     {
//       name: "profile",
//       path: "/dashboard/home",
//       icon: UserIcon,
//     },
//     {
//       name: "student",
//       path: "/dashboard/student",
//       icon: UserIcon,
//     },
//     // {
//     //   name: "sign up",
//     //   path: "/auth/sign-up",
//     //   icon: UserPlusIcon,
//     // },
//     // {
//     //   name: "sign in",
//     //   path: "/auth/sign-in",
//     //   icon: ArrowRightOnRectangleIcon,
//     // },
//   ];

//   return (
//     <div className="relative min-h-screen w-full">
//       {/* <Routes>
//         {routes.map(
//           ({ layout, pages }) =>
//             layout === "auth" &&
//             pages.map(({ path, element }) => (
//               <Route exact path={path} element={element} />
//             ))
//         )}
//       </Routes> */}
//       <Routes>
//   {routes.map(
//     ({ layout, pages }) =>
//       layout === "auth" &&
//       pages.map(({ path, element }) => (
//         <Route key={path} path={path} element={element} />
//       ))
//   )}
// </Routes>

//     </div>
//   );
// }

// Auth.displayName = "/src/layout/Auth.jsx";

// export default Auth;


import { Routes, Route, Navigate } from "react-router-dom";
import routes from "@/routes";
import { isAuthenticated } from "@/utils/auth";

export function Auth() {

  //  If already logged in, never show auth pages
  if (isAuthenticated()) {
    return <Navigate to="/dashboard/home" replace />;
  }

  return (
    <div className="relative min-h-screen w-full">
      <Routes>
        {routes.map(
          ({ layout, pages }) =>
            layout === "auth" &&
            pages.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))
        )}
      </Routes>
    </div>
  );
}

Auth.displayName = "/src/layout/Auth.jsx";
export default Auth;
