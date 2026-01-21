import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import StudentList from "./pages/dashboard/Student/StudentList";
import AddStudent from "./pages/dashboard/Student/Addstudent";
import EditStudent from "./pages/dashboard/Student/Editstudent";
function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      {/* <Route path="/dashboard/studentlist" element={<StudentList />} /> */}
      <Route path="/dashboard/addStudent" element={<AddStudent />} />
      <Route path="/dashboard/editStudent/:id" element={<EditStudent />} />


    </Routes>
  );
}

export default App;
