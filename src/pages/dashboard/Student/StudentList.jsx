import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "@/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const PAGE_SIZE = 5;

function StudentList() {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("name"); // name | dob
  const [showModal, setShowModal] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState(null);

  const navigate = useNavigate();

  const fetchStudents = async () => {
    const snap = await getDocs(collection(db, "students"));
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setStudents(list);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ---------- SORT ----------
  const sortedStudents = [...students].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "dob") return new Date(a.dob) - new Date(b.dob);
    return 0;
  });

  // ---------- PAGINATION ----------
  const totalPages = Math.ceil(sortedStudents.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const paginated = sortedStudents.slice(start, start + PAGE_SIZE);

  // ---------- DELETE MODAL ----------
  const openDeleteModal = (student) => {
    setDeleteInfo(student);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setDeleteInfo(null);
  };

  const confirmDelete = async () => {
    try {
      await deleteDoc(doc(db, "students", deleteInfo.id));
      if (deleteInfo.imageId) localStorage.removeItem(deleteInfo.imageId);

      setStudents((prev) => prev.filter((s) => s.id !== deleteInfo.id));
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Students</h2>

        <button
          onClick={() => navigate("/dashboard/addStudent")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Student
        </button>
      </div>

      {/* SORT */}
      <div className="flex gap-3 mb-4">
        <span className="text-sm font-medium">Sort By:</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded px-3 py-1 text-sm"
        >
          <option value="name">Name (A-Z)</option>
          <option value="dob">DOB (Oldest)</option>
        </select>
      </div>

      {/* TABLE */}
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
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((s) => {
              const img = s.imageId
                ? localStorage.getItem(s.imageId)
                : null;

              return (
                <tr key={s.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">
                    {img ? (
                      <img
                        src={img}
                        className="h-10 w-10 rounded-full object-cover"
                        alt="profile"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-300" />
                    )}
                  </td>

                  <td className="p-4 font-medium">{s.name}</td>
                  <td className="p-4">{s.email}</td>
                  <td className="p-4">{s.gender}</td>
                  <td className="p-4">{s.dob}</td>

                  <td className="p-4">
                    {s.languages?.map((l) => (
                      <span
                        key={l}
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs mr-2"
                      >
                        {l}
                      </span>
                    ))}
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4 space-x-2">
                    <button
                      onClick={() =>
                        navigate(`/dashboard/editStudent/${s.id}`)
                      }
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => openDeleteModal(s)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {students.length === 0 && (
          <p className="text-center py-8 text-gray-500">No students found</p>
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                page === i + 1 ? "bg-blue-600 text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* DELETE MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="text-lg font-semibold mb-3">
              Delete Student?
            </h3>
            <p className="text-sm text-gray-600 mb-5">
              Are you sure you want to delete{" "}
              <b>{deleteInfo?.name}</b>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default StudentList;
