// import {
//   Card,
//   Input,
//   Checkbox,
//   Button,
//   Typography,
// } from "@material-tailwind/react";
// import { Link } from "react-router-dom";


// export function SignUp() {
//   return (
//     <section className="m-8 flex">
//             <div className="w-2/5 h-full hidden lg:block">
//         <img
//           src="/img/pattern.png"
//           className="h-full w-full object-cover rounded-3xl"
//         />
//       </div>
//       <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
//         <div className="text-center">
//           <Typography variant="h2" className="font-bold mb-4">Join Us Today</Typography>
//           <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to register.</Typography>
//         </div>
//         <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
//           <div className="mb-1 flex flex-col gap-6">
//             <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
//               Your email
//             </Typography>
//             <Input
//               size="lg"
//               placeholder="name@mail.com"
//               className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
//               labelProps={{
//                 className: "before:content-none after:content-none",
//               }}
//             />
//           </div>
//           {/* <Checkbox
//             label={
//               <Typography
//                 variant="small"
//                 color="gray"
//                 className="flex items-center justify-start font-medium"
//               >
//                 I agree the&nbsp;
//                 <a
//                   href="#"
//                   className="font-normal text-black transition-colors hover:text-gray-900 underline"
//                 >
//                   Terms and Conditions
//                 </a>
//               </Typography>
//             }
//             containerProps={{ className: "-ml-2.5" }}
//           /> */}
//           <Button className="mt-6" fullWidth>
//             Register Now
//           </Button>

//           <div className="space-y-4 mt-8">
//             {/* <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth>
//               <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <g clipPath="url(#clip0_1156_824)">
//                   <path d="M16.3442 8.18429C16.3442 7.64047 16.3001 7.09371 16.206 6.55872H8.66016V9.63937H12.9813C12.802 10.6329 12.2258 11.5119 11.3822 12.0704V14.0693H13.9602C15.4741 12.6759 16.3442 10.6182 16.3442 8.18429Z" fill="#4285F4" />
//                   <path d="M8.65974 16.0006C10.8174 16.0006 12.637 15.2922 13.9627 14.0693L11.3847 12.0704C10.6675 12.5584 9.7415 12.8347 8.66268 12.8347C6.5756 12.8347 4.80598 11.4266 4.17104 9.53357H1.51074V11.5942C2.86882 14.2956 5.63494 16.0006 8.65974 16.0006Z" fill="#34A853" />
//                   <path d="M4.16852 9.53356C3.83341 8.53999 3.83341 7.46411 4.16852 6.47054V4.40991H1.51116C0.376489 6.67043 0.376489 9.33367 1.51116 11.5942L4.16852 9.53356Z" fill="#FBBC04" />
//                   <path d="M8.65974 3.16644C9.80029 3.1488 10.9026 3.57798 11.7286 4.36578L14.0127 2.08174C12.5664 0.72367 10.6469 -0.0229773 8.65974 0.000539111C5.63494 0.000539111 2.86882 1.70548 1.51074 4.40987L4.1681 6.4705C4.8001 4.57449 6.57266 3.16644 8.65974 3.16644Z" fill="#EA4335" />
//                 </g>
//                 <defs>
//                   <clipPath id="clip0_1156_824">
//                     <rect width="16" height="16" fill="white" transform="translate(0.5)" />
//                   </clipPath>
//                 </defs>
//               </svg>
//               <span>Sign in With Google</span>
//             </Button>
//             <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth>
//               <img src="/img/twitter-logo.svg" height={24} width={24} alt="" />
//               <span>Sign in With Twitter</span>
//             </Button> */}
//           </div>
//           <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
//             Already have an account?
//             <Link to="/auth/sign-in" className="text-gray-900 ml-1">Sign in</Link>
//           </Typography>
//         </form>

//       </div>
//     </section>
//   );
// }

// export default SignUp;


import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { collection, addDoc } from "firebase/firestore";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";

export function SignUp() {

  const navigate = useNavigate();

  // ---------- STATES ----------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  // const [languages, setLanguages] = useState([]);
  const [imageBase64, setImageBase64] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ---------- VALIDATION ----------
  const validate = () => {
    let e = {};

    if (!name) e.name = "Name is required";
    if (!email) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Invalid email";
    if (!password) e.password = "Password is required";
    if (!gender) e.gender = "Select gender";
    if (!dob) e.dob = "Select DOB";
    // if (languages.length === 0) e.languages = "Select skill";
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

const createToken = (payload) => btoa(JSON.stringify(payload));

const handleRegister = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  try {
    setLoading(true);

    // save image locally
    const imageId = `student_img_${Date.now()}`;
    localStorage.setItem(imageId, imageBase64);

    // 1. save user in Firestore
    const docRef = await addDoc(collection(db, "users"), {
      name,
      email, /* */
      password, /* xyz@123 */
      gender,
      dob,
      // languages,
      imageId,
      createdAt: new Date(),
    });

    // 2. generate fake JWT
    const token = createToken({
      userId: docRef.id,
      email,
      time: Date.now(),
    });

    // 3. save token in firestore
    await updateDoc(doc(db, "users", docRef.id), { token });

    // 4. save login session
    localStorage.setItem("user_id", docRef.id);
    localStorage.setItem("user_token", token);

    // navigate("/auth/sign-in");
navigate("/dashboard/home");

  } catch (err) {
    console.error(err);
    alert("Registration failed");
  } finally {
    setLoading(false);
  }
};


  // ---------- UI ----------
  return (
    <section className="m-8 flex">
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>

      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Join Us Today
          </Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            Enter your details to register.
          </Typography>
        </div>

        {/* ONLY LOGIC ADDED — DESIGN SAME */}
        <form
          onSubmit={handleRegister}
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
        >
          <div className="mb-1 flex flex-col gap-6">

            <Input
              size="lg"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

            <Input
              size="lg"
              placeholder="name@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <Input
              type="password"
              size="lg"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

           <div>
            <Typography variant="small" className="mb-1 font-medium">
              Gender
            </Typography>

            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Male
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Female
              </label>
            </div>

            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
          </div>

            <div>
              <Typography variant="small" className="mb-1 font-medium">
                Date of Birth
              </Typography>

              <Input
                type="date"
                size="lg"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />

              {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
            </div>


            {/* Languages (comma separated) */}
            {/* <div>
            <Typography variant="small" className="mb-1 font-medium">
              Languages
            </Typography>

            <div className="flex flex-wrap gap-4">
              {["HTML", "CSS", "JS", "REACT"].map((lang) => (
                <label key={lang} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={languages.includes(lang)}
                    onChange={() =>
                      setLanguages((prev) =>
                        prev.includes(lang)
                          ? prev.filter((l) => l !== lang)
                          : [...prev, lang]
                      )
                    }
                  />
                  {lang}
                </label>
              ))}
            </div>

            {errors.languages && <p className="text-red-500 text-sm">{errors.languages}</p>}
          </div> */}

            {/* Image Upload */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImage(e.target.files[0])}
            />
            {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}

          </div>

          <Button className="mt-6" fullWidth type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register Now"}
          </Button>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Already have an account?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">
              Sign in
            </Link>
          </Typography>
        </form>

      </div>
    </section>
  );
}

export default SignUp;
