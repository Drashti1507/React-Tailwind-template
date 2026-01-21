import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

function StudentList() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const studentRef = collection(db, "students");

  const fetchStudents = async () => {
    const snap = await getDocs(studentRef);
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setStudents(list);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Students</h2>
        <button
          onClick={() => navigate("/dashboard/addStudent")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Student
        </button>
      </div>

      {/* DATA TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="p-4 text-left">Profile</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Gender</th>
              <th className="p-4 text-left">DOB</th>
              <th className="p-4 text-left">Skills</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <img src={s.profile} className="h-10 w-10 rounded-full object-cover" />
                </td>
                <td className="p-4 font-medium">{s.name}</td>
                <td className="p-4">{s.email}</td>
                <td className="p-4">{s.gender}</td>
                <td className="p-4">{s.dob}</td>
                <td className="p-4">
                  {s.languages.map((l) => (
                    <span
                      key={l}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs mr-2"
                    >
                      {l}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {students.length === 0 && (
          <p className="text-center py-8 text-gray-500">No students found</p>
        )}
      </div>
    </div>
  );
}

export default StudentList;