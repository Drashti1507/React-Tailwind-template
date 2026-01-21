import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "@/firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";

function AddStudent() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [languages, setLanguages] = useState([]);
  const [imageBase64, setImageBase64] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Add Student | Dashboard";
  }, []);

  const studentRef = collection(db, "students");

  // ---------- TOKEN (FAKE JWT) ----------
  // const createToken = (payload) => {
  //   return btoa(JSON.stringify(payload)); // base64
  // };

  // ---------- VALIDATION ----------
  const validate = () => {
    let e = {};
    if (!name) e.name = "Name is required";
    if (!email) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Invalid email";
    if (!gender) e.gender = "Select gender";
    if (!dob) e.dob = "Select DOB";
    if (languages.length === 0) e.languages = "Select skill";
    if (!imageBase64) e.image = "Upload image";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ---------- IMAGE ----------
  const handleImage = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImageBase64(reader.result);
    reader.readAsDataURL(file);
  };

  // ---------- SAVE ----------
  const handleSave = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      // save image locally
      const imageId = `student_img_${Date.now()}`;
      localStorage.setItem(imageId, imageBase64);

      // 1. add student
      const docRef = await addDoc(studentRef, {
        name,
        email,
        gender,
        dob,
        languages,
        imageId,
        createdAt: new Date(),
      });

      // 2. create token
      // const token = createToken({
      //   studentId: docRef.id,
      //   name,
      //   email,
      //   time: Date.now(),
      // });

      // 3. save token in firestore
      // const studentDocRef = doc(db, "students", docRef.id);
      // await updateDoc(studentDocRef, {
      //   token: token,
      // });

      localStorage.setItem("student_id", docRef.id);
      // 4. save token in localStorage
      // localStorage.setItem("student_token", token);

      // 5. go to profile
      navigate("/dashboard/students");
    } catch (err) {
      console.error(err);
      alert("Save failed");
    } finally {
      setLoading(false);
    }
  };

  const toggleLang = (lang) => {
    setLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  // ---------- UI ----------
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="bg-white rounded-xl w-full max-w-xl shadow overflow-hidden">
  <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 text-white text-center">
    <h2 className="text-2xl font-bold">Student Registration</h2>
    <p className="text-sm opacity-90">Create your student account</p>
  </div>

  <div className="p-8">


        <h2 className="text-2xl font-bold mb-4 text-center">Add Student</h2>

        <input autoFocus
          className="w-full border p-2 mb-1 rounded"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <input autoFocus
          className="w-full border p-2 mt-3 mb-1 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <select autoFocus
          className="w-full border p-2 mt-3 rounded"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <input autoFocus
          type="date"
          className="w-full border p-2 mt-3 rounded"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />

        <div className="mt-3 flex flex-wrap gap-3">
          {["HTML", "CSS", "JS", "REACT"].map((l) => (
            <label key={l} className="flex items-center gap-1">
              <input autoFocus
                type="checkbox"
                checked={languages.includes(l)}
                onChange={() => toggleLang(l)}
              />
              {l}
            </label>
          ))}
        </div>

        <input autoFocus
          type="file"
          className="w-full mt-3"
          accept="image/*"
          onChange={(e) => handleImage(e.target.files[0])}
        />

        {imageBase64 && (
          <img
            src={imageBase64}
            className="h-20 w-20 rounded-full mt-3 object-cover"
          />
        )}

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white p-2 mt-5 rounded"
        >
          {loading ? "Saving..." : "Save Student"}
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/dashboard/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
    </div>
  );
}

export default AddStudent;
