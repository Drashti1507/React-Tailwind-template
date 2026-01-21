import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, storage } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function AddStudent() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [languages, setLanguages] = useState([]);
  // const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});

  const studentRef = collection(db, "students");

  const validate = () => {
    let e = {};
    if (!name) e.name = "Name required";
    if (!email) e.email = "Email required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Invalid email";
    if (!gender) e.gender = "Select gender";
    if (!dob) e.dob = "Select DOB";
    if (languages.length === 0) e.languages = "Select skills";
    // if (!imageFile) e.image = "Upload image";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    // const imgRef = ref(storage, `students/${Date.now()}-${imageFile.name}`);
    // await uploadBytes(imgRef, imageFile);
    // const url = await getDownloadURL(imgRef);

    await addDoc(studentRef, {
      name,
      email,
      gender,
      dob,
      languages,
      // profile: url,
    });

    navigate("/dashboard/studentlist"); 
  };

  const toggleLang = (l) => {
    setLanguages((p) => (p.includes(l) ? p.filter((x) => x !== l) : [...p, l]));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-start">

      <div className="bg-white rounded-xl shadow p-6 w-full max-w-xl">

        <h2 className="text-xl font-semibold mb-4">Add Student</h2>

        <div className="space-y-4">

          <input className="input" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <input className="input" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <select className="input" value={gender} onChange={(e)=>setGender(e.target.value)}>
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}

          <input type="date" className="input" value={dob} onChange={(e)=>setDob(e.target.value)} />
          {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}

          <div className="flex gap-4">
            {["HTML","CSS","JS","REACT"].map(l=>(
              <label key={l} className="flex gap-2">
                <input type="checkbox" onChange={()=>toggleLang(l)} />
                {l}
              </label>
            ))}
          </div>
          {errors.languages && <p className="text-red-500 text-sm">{errors.languages}</p>}

          {/* <input type="file" onChange={(e)=>setImageFile(e.target.files[0])} />
          {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>} */}

          <button onClick={handleSave} className="w-full bg-green-600 text-white py-2 rounded-lg">
            Save Student
          </button>

        </div>
      </div>
    </div>
  );
}

export default AddStudent;

// add in main branch 