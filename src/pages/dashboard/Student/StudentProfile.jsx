import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "@/firebase";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
import { doc, getDoc, updateDoc, deleteField } from "firebase/firestore";

function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchStudent = async () => {
      try {
        const ref = doc(db, "students", id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setStudent(snap.data());
        } else {
          alert("Student not found");
          navigate("/dashboard/students");
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id, navigate]);

  //  LOGOUT (remove token from Firestore + localStorage)
  const handleLogout = async () => {
  try {
    const ref = doc(db, "students", id);

    // delete token field completely
    await updateDoc(ref, {
      token: deleteField(),
    });

    // remove token from localStorage
    localStorage.removeItem("student_id");
    localStorage.removeItem("student_token");

    navigate("/dashboard/addStudent");
  } catch (err) {
    console.error("Logout failed:", err);
    alert("Logout failed");
  }
};

  // const handleLogout = async () => {
  //   try {
  //     const ref = doc(db, "students", id);
  //     await updateDoc(ref, { token: null });

  //     localStorage.removeItem("student_token");

  //     navigate("/dashboard/addStudent");
  //   } catch (err) {
  //     console.error("Logout failed:", err);
  //     alert("Logout failed");
  //   }
  // };

  if (loading)
    return <p className="p-10 text-center text-lg">Loading...</p>;

  if (!student)
    return <p className="p-10 text-center text-lg">No student data</p>;

  const img = student.imageId
    ? localStorage.getItem(student.imageId)
    : null;

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 relative">

        {/* <button
          onClick={handleLogout}
          className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1.5 rounded-lg"
        >
          Logout
        </button> */}

        <div className="flex flex-col items-center text-center">
          {img ? (
            <img
              src={img}
              alt="profile"
              className="h-28 w-28 rounded-full object-cover border-4 border-blue-500 mb-4"
            />
          ) : (
            <div className="h-28 w-28 rounded-full bg-gray-300 mb-4" />
          )}

          <h2 className="text-2xl font-bold text-gray-800">
            {student.name}
          </h2>

          <p className="text-gray-500">{student.email}</p>

          <div className="mt-4 space-y-1 text-sm text-gray-700">
            <p><b>Gender:</b> {student.gender}</p>
            <p><b>DOB:</b> {student.dob}</p>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {student.languages?.map((l) => (
              <span
                key={l}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
         <button
          onClick={() => navigate("/dashboard/home")}
          className="bg-green-300 text-white px-5 py-2 rounded-lg hover:bg-green-200"
        >
           Back To The DashBoard
        </button></div>
      </div>
    </div>
  );
}

export default StudentProfile;
