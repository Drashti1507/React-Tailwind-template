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
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { FaUserCircle, FaEnvelope, FaBirthdayCake, FaSignOutAlt } from "react-icons/fa";

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
  // 🔥 GOOGLE AUTH LISTENER (ADDED - DOES NOT REMOVE YOUR LOGIC)
useEffect(() => {
  const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      try {
        const ref = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          setUser(data);
          setProfileImg(data.photo || null); // Google photo
        }
      } catch (err) {
        console.error("Google user fetch error:", err);
      }
    }
  });

  return () => unsub();
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
  

  //google logout
  const handleGoogleLogout = async () =>{ 
    try { await signOut(auth); 
    localStorage.removeItem("user_id"); 
    localStorage.removeItem("user_token"); 
    setUser(null); setProfileImg(null); 
    navigate("/auth/sign-in"); 
  } 
  catch (err)
   {
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
              {/* <MenuHandler>
                <IconButton variant="text">
                  <Avatar
                    src={profileImg || "/img/user.png"}
                    size="sm"
                    alt="profile"
                  />
                </IconButton>
              </MenuHandler> */}
              <MenuHandler>
              <Button variant="text" className="flex items-center gap-2">
                <Avatar
                  src={profileImg || "/img/user.png"}
                  size="sm"
                  alt="profile"
                />
                <span className="hidden md:block text-sm font-medium">
                  {user.name}
                </span>
              </Button>
            </MenuHandler>


              <MenuList>
  <MenuItem className="flex items-center gap-2">
    <FaUserCircle className="text-blue-gray-700" />
    Hello, <b>{user.name}</b>
  </MenuItem>

  <MenuItem className="flex items-center gap-2">
    <FaEnvelope className="text-blue-gray-700" />
    {user.email}
  </MenuItem>

  {user.dob && (
    <MenuItem className="flex items-center gap-2">
      <FaBirthdayCake className="text-blue-gray-700" />
      {user.dob}
    </MenuItem>
  )}

  <hr className="my-2" />

  <MenuItem
    className="flex items-center gap-2 text-red-500"
    onClick={user?.provider === "google" ? handleGoogleLogout : handleLogout}
  >
    <FaSignOutAlt />
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
