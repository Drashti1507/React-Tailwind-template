import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignUp , SignIn } from "@/pages/auth";
import Student from "@/pages/dashboard/Student/StudentList";
// import Logout from "./pages/auth/Logout";
import { UserGroupIcon } from "@heroicons/react/24/solid";


const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },
      {
        icon: <UserGroupIcon className="h-5 w-5" />,
        name: "students",
        path: "/students",
        element: <Student />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];
// export const getRoutes = () => {
//   const isLoggedIn =
//     localStorage.getItem("user_id") && localStorage.getItem("user_token");

//   return [
//     {
//       layout: "dashboard",
//       pages: [
//         {
//           icon: <HomeIcon className="w-5 h-5" />,
//           name: "dashboard",
//           path: "/home",
//           element: <Home />,
//         },
//         {
//           icon: <UserCircleIcon className="w-5 h-5" />,
//           name: "profile",
//           path: "/profile",
//           element: <Profile />,
//         },
//         {
//           icon: <TableCellsIcon className="w-5 h-5" />,
//           name: "tables",
//           path: "/tables",
//           element: <Tables />,
//         },
//         {
//           icon: <InformationCircleIcon className="w-5 h-5" />,
//           name: "notifications",
//           path: "/notifications",
//           element: <Notifications />,
//         },

//         // ✅ SHOW ONLY WHEN LOGGED OUT
//         ...(!isLoggedIn
//           ? [
//               {
//                 icon: <UserGroupIcon className="h-5 w-5" />,
//                 name: "students",
//                 path: "/students",
//                 element: <Student />,
//               },
//             ]
//           : []),
//       ],
//     },

//     {
//       title: "auth pages",
//       layout: "auth",
//       pages: [
//         {
//           icon: <ServerStackIcon className="w-5 h-5" />,
//           name: "sign in",
//           path: "/sign-in",
//           element: <SignIn />,
//         },
//         {
//           icon: <RectangleStackIcon className="w-5 h-5" />,
//           name: "sign up",
//           path: "/sign-up",
//           element: <SignUp />,
//         },
//       ],
//     },
//   ];
// };

export default routes;
