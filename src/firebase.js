import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyAzDWb_niOpc6GZIFjr7EgBlzRUBfGnyyI",
//   authDomain: "stud-crud-92744.firebaseapp.com",
//   projectId: "stud-crud-92744",
//   storageBucket: "stud-crud-92744.firebasestorage.app",
//   messagingSenderId: "75784779424",
//   appId: "1:75784779424:web:666615e67cee0fec64bbc5",
//   measurementId: "G-6E57L3GNYJ"
// };
const firebaseConfig = {
  apiKey: "AIzaSyAzDWb_niOpc6GZIFjr7EgBlzRUBfGnyyI",
  authDomain: "stud-crud-92744.firebaseapp.com",
  projectId: "stud-crud-92744",
  storageBucket: "stud-crud-92744.appspot.com",
  messagingSenderId: "75784779424",
  appId: "1:75784779424:web:666615e67cee0fec64bbc5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
