import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [languages, setLanguages] = useState([]);
  const [imageBase64, setImageBase64] = useState("");
  const [oldImageId, setOldImageId] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ---------- LOAD STUDENT ----------
  useEffect(() => {
    const loadStudent = async () => {
      try {
        const ref = doc(db, "students", id);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          alert("Student not found");
          navigate("/dashboard/students");
          return;
        }

        const data = snap.data();

        setName(data.name);
        setEmail(data.email);
        setGender(data.gender);
        setDob(data.dob);
        setLanguages(data.languages || []);
        setOldImageId(data.imageId || "");

        if (data.imageId) {
          const img = localStorage.getItem(data.imageId);
          setImageBase64(img || "");
        }
      } catch (err) {
        console.error("Load error:", err);
      }
    };

    loadStudent();
  }, [id, navigate]);

  // ---------- VALIDATION ----------
  const validate = () => {
    let e = {};
    if (!name) e.name = "Name required";
    if (!email) e.email = "Email required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Invalid email";
    if (!gender) e.gender = "Select gender";
    if (!dob) e.dob = "Select DOB";
    if (languages.length === 0) e.languages = "Select at least one skill";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ---------- IMAGE ----------
  const handleImage = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // ---------- UPDATE ----------
  const handleUpdate = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      let imageId = oldImageId;

      // if image changed, replace in localStorage
      if (imageBase64 && imageBase64 !== localStorage.getItem(oldImageId)) {
        if (oldImageId) localStorage.removeItem(oldImageId);

        imageId = `student_img_${Date.now()}`;
        localStorage.setItem(imageId, imageBase64);
      }

      await updateDoc(doc(db, "students", id), {
        name,
        email,
        gender,
        dob,
        languages,
        imageId,
        updatedAt: new Date(),
      });

      navigate("/dashboard/students");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update student");
    } finally {
      setLoading(false);
    }
  };

  const toggleLang = (lang) => {
    setLanguages((prev) =>
      prev.includes(lang)
        ? prev.filter((l) => l !== lang)
        : [...prev, lang]
    );
  };

  // ---------- UI ----------
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-blue-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Edit Student
        </h1>

        <div className="space-y-4">

          {/* Name */}
          <div>
            <input
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <input
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Gender */}
          <div>
            <select
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
          </div>

          {/* DOB */}
          <div>
            <input
              type="date"
              max={new Date().toISOString().split("T")[0]}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
            {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
          </div>

          {/* Skills */}
          <div>
            <p className="font-medium mb-2">Skills</p>
            <div className="grid grid-cols-2 gap-2">
              {["HTML", "CSS", "JS", "REACT"].map((l) => (
                <label
                  key={l}
                  className="flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={languages.includes(l)}
                    onChange={() => toggleLang(l)}
                  />
                  {l}
                </label>
              ))}
            </div>
            {errors.languages && (
              <p className="text-red-500 text-sm mt-1">{errors.languages}</p>
            )}
          </div>

          {/* Profile */}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImage(e.target.files[0])}
              className="w-full border rounded-lg px-3 py-2"
            />

            {imageBase64 && (
              <img
                src={imageBase64}
                alt="preview"
                className="mt-3 h-24 w-24 object-cover rounded-full border mx-auto"
              />
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => navigate("/dashboard/students")}
              className="text-sm text-blue-600 hover:underline"
            >
              ← Back to List
            </button>

            <button
              onClick={handleUpdate}
              disabled={loading}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Student"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default EditStudent;
