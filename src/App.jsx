// import { Routes, Route, Navigate } from "react-router-dom";
// import { Dashboard, Auth } from "@/layouts";
// import StudentList from "./pages/dashboard/Student/StudentList";
// import AddStudent from "./pages/dashboard/Student/Addstudent";
// import EditStudent from "./pages/dashboard/Student/Editstudent";
// import StudentProfile from "./pages/dashboard/Student/StudentProfile";
// function App() {
//   return (
//     <Routes>
//       <Route path="/dashboard/*" element={<Dashboard />} />
//       <Route path="/auth/*" element={<Auth />} />
//       <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
//       {/* <Route path="/dashboard/studentlist" element={<StudentList />} /> */}
//       <Route path="/dashboard/addStudent" element={<AddStudent />} />
//       <Route path="/dashboard/editStudent/:id" element={<EditStudent />} />
//       <Route path="/dashboard/studentprofile/:id" element={<StudentProfile />} />
//     </Routes>
//   );
// }

// export default App;
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";

import AddStudent from "./pages/dashboard/Student/Addstudent";
import EditStudent from "./pages/dashboard/Student/Editstudent";
import StudentProfile from "./pages/dashboard/Student/StudentProfile";

function App() {
  return (
    <Routes>
      {/* FIRST PAGE ALWAYS DASHBOARD HOME */}
      <Route path="/" element={<Navigate to="/dashboard/home" replace />} />

      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />

      <Route path="/dashboard/addStudent" element={<AddStudent />} />
      <Route path="/dashboard/editStudent/:id" element={<EditStudent />} />
      <Route path="/dashboard/studentprofile/:id" element={<StudentProfile />} />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;
