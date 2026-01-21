// import { useLocation, Link } from "react-router-dom";
// import {
//   Navbar,
//   Typography,
//   Button,
//   IconButton,
//   Breadcrumbs,
//   Input,
//   Menu,
//   MenuHandler,
//   MenuList,
//   MenuItem,
//   Avatar,
// } from "@material-tailwind/react";
// import {
//   UserCircleIcon,
//   Cog6ToothIcon,
//   BellIcon,
//   ClockIcon,
//   CreditCardIcon,
//   Bars3Icon,
// } from "@heroicons/react/24/solid";
// import {
//   useMaterialTailwindController,
//   setOpenConfigurator,
//   setOpenSidenav,
// } from "@/context";

// export function DashboardNavbar() {
//   const [controller, dispatch] = useMaterialTailwindController();
//   const { fixedNavbar, openSidenav } = controller;
//   const { pathname } = useLocation();
//   const [layout, page] = pathname.split("/").filter((el) => el !== "");

//   return (
//     <Navbar
//       color={fixedNavbar ? "white" : "transparent"}
//       className={`rounded-xl transition-all ${
//         fixedNavbar
//           ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
//           : "px-0 py-1"
//       }`}
//       fullWidth
//       blurred={fixedNavbar}
//     >
//       <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
//         <div className="capitalize">
//           <Breadcrumbs
//             className={`bg-transparent p-0 transition-all ${
//               fixedNavbar ? "mt-1" : ""
//             }`}
//           >
//             <Link to={`/${layout}`}>
//               <Typography
//                 variant="small"
//                 color="blue-gray"
//                 className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
//               >
//                 {layout}
//               </Typography>
//             </Link>
//             <Typography
//               variant="small"
//               color="blue-gray"
//               className="font-normal"
//             >
//               {page}
//             </Typography>
//           </Breadcrumbs>
//           <Typography variant="h6" color="blue-gray">
//             {page}
//           </Typography>
//         </div>
//         <div className="flex items-center">
//           <div className="mr-auto md:mr-4 md:w-56">
//             <Input label="Search" />
//           </div>
//           <IconButton
//             variant="text"
//             color="blue-gray"
//             className="grid xl:hidden"
//             onClick={() => setOpenSidenav(dispatch, !openSidenav)}
//           >
//             <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
//           </IconButton>
//           <Link to="/auth/sign-up">
//             <Button
//               variant="text"
//               color="blue-gray"
//               className="hidden items-center gap-1 px-4 xl:flex normal-case"
//             >
//               <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
//               Sign Up
//             </Button>
//             <IconButton
//               variant="text"
//               color="blue-gray"
//               className="grid xl:hidden"
//             >
//               <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
//             </IconButton>
//           </Link>
//           <Menu>
//             <MenuHandler>
//               <IconButton variant="text" color="blue-gray">
//                 <BellIcon className="h-5 w-5 text-blue-gray-500" />
//               </IconButton>
//             </MenuHandler>
//             <MenuList className="w-max border-0">
//               <MenuItem className="flex items-center gap-3">
//                 <Avatar
//                   src="https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg"
//                   alt="item-1"
//                   size="sm"
//                   variant="circular"
//                 />
//                 <div>
//                   <Typography
//                     variant="small"
//                     color="blue-gray"
//                     className="mb-1 font-normal"
//                   >
//                     <strong>New message</strong> from Laur
//                   </Typography>
//                   <Typography
//                     variant="small"
//                     color="blue-gray"
//                     className="flex items-center gap-1 text-xs font-normal opacity-60"
//                   >
//                     <ClockIcon className="h-3.5 w-3.5" /> 13 minutes ago
//                   </Typography>
//                 </div>
//               </MenuItem>
//               <MenuItem className="flex items-center gap-4">
//                 <Avatar
//                   src="https://demos.creative-tim.com/material-dashboard/assets/img/small-logos/logo-spotify.svg"
//                   alt="item-1"
//                   size="sm"
//                   variant="circular"
//                 />
//                 <div>
//                   <Typography
//                     variant="small"
//                     color="blue-gray"
//                     className="mb-1 font-normal"
//                   >
//                     <strong>New album</strong> by Travis Scott
//                   </Typography>
//                   <Typography
//                     variant="small"
//                     color="blue-gray"
//                     className="flex items-center gap-1 text-xs font-normal opacity-60"
//                   >
//                     <ClockIcon className="h-3.5 w-3.5" /> 1 day ago
//                   </Typography>
//                 </div>
//               </MenuItem>
//               <MenuItem className="flex items-center gap-4">
//                 <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-gray-800 to-blue-gray-900">
//                   <CreditCardIcon className="h-4 w-4 text-white" />
//                 </div>
//                 <div>
//                   <Typography
//                     variant="small"
//                     color="blue-gray"
//                     className="mb-1 font-normal"
//                   >
//                     Payment successfully completed
//                   </Typography>
//                   <Typography
//                     variant="small"
//                     color="blue-gray"
//                     className="flex items-center gap-1 text-xs font-normal opacity-60"
//                   >
//                     <ClockIcon className="h-3.5 w-3.5" /> 2 days ago
//                   </Typography>
//                 </div>
//               </MenuItem>
//             </MenuList>
//           </Menu>
//           <IconButton
//             variant="text"
//             color="blue-gray"
//             onClick={() => setOpenConfigurator(dispatch, true)}
//           >
//             <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
//           </IconButton>
//         </div>
//       </div>
//     </Navbar>
//   );
// }

// DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

// export default DashboardNavbar;

import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";
import { db } from "@/firebase";
import { updateDoc, doc, deleteField, getDoc } from "firebase/firestore";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");

  const [user, setUser] = useState(null);
  const [profileImg, setProfileImg] = useState(null);

  // FETCH USER + IMAGE
  useEffect(() => {
    const fetchUser = async () => {
      const uid = localStorage.getItem("user_id");
      const token = localStorage.getItem("user_token");

      if (!uid || !token) {
        setUser(null);
        setProfileImg(null);
        return;
      }

      try {
        const ref = doc(db, "users", uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();

          if (data.token === token) {
            setUser(data);

            // fetch image from localStorage using imageId
            if (data.imageId) {
              const img = localStorage.getItem(data.imageId);
              setProfileImg(img);
            }
          } else {
            setUser(null);
            setProfileImg(null);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
    window.addEventListener("storage", fetchUser);
    return () => window.removeEventListener("storage", fetchUser);
  }, []);

  // LOGOUT
  const handleLogout = async () => {
    try {
      const uid = localStorage.getItem("user_id");

      if (uid) {
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, { token: deleteField() });
      }

      localStorage.removeItem("user_id");
      localStorage.removeItem("user_token");

      setUser(null);
      setProfileImg(null);
      navigate("/auth/sign-in");
    } catch (err) {
      console.error("Logout error:", err);
      alert("Logout failed");
    }
  };

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs className="bg-transparent p-0">
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 hover:text-blue-500"
              >
                {layout}
              </Typography>
            </Link>
            <Typography variant="small" color="blue-gray">
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>

        <div className="flex items-center">
          <div className="mr-auto md:mr-4 md:w-56">
            <Input label="Search" />
          </div>

          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon className="h-6 w-6 text-blue-gray-500" />
          </IconButton>

          {/* NOT LOGGED IN */}
          {!user && (
            <Link to="/auth/sign-up">
              <Button
                variant="text"
                color="blue-gray"
                className="hidden xl:flex items-center gap-1"
              >
                <UserCircleIcon className="h-5 w-5" />
                Sign Up
              </Button>
            </Link>
          )}

          {/* LOGGED IN */}
          {user && (
            <Menu>
              <MenuHandler>
                <IconButton variant="text">
                  <Avatar
                    src={profileImg || "/img/user.png"}
                    size="sm"
                    alt="profile"
                  />
                </IconButton>
              </MenuHandler>

              <MenuList>
                <MenuItem>
                  👋 Hello, <b>{user.name}</b>
                </MenuItem>
                <MenuItem>📧 {user.email}</MenuItem>
                <MenuItem>🎂 {user.dob}</MenuItem>

                <hr className="my-2" />

                <MenuItem className="text-red-500" onClick={handleLogout}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          )}

          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}

export default DashboardNavbar;
