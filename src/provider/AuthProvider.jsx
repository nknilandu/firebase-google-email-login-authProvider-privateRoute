import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider
} from "firebase/auth";
import { app } from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

export default function AuthProvider({ children }) {
  // create user
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // login user
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  // forgot password
  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  //   log out user
  const logOut = () => {
    setUserData(null)
    return signOut(auth);
  };
  // sign in or sign up with google
  const provider = new GoogleAuthProvider();
  const googleSignIn = () => {
    return signInWithPopup(auth, provider);
  };

//   check user
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setLoading(false);
      setUserData(user);
    });
  }, []);

    //   share function
  const authData = {
    createUser: createUser,
    loginUser: loginUser,
    forgotPassword,
    logOut,
    googleSignIn,
    userData,
    setUserData,
    loading,
    setLoading,
  };

  return <AuthContext value={authData}>{children}</AuthContext>;
}

// export default function AuthProvider ({children}) {
//     const authData = {
//         user: "nk nilandu",
//         mail: "nknilandu@gmail.com"
//     }
//     return (
//         <AuthContext value={authData}>
//             {children}
//         </AuthContext>
//     );
// };

// in main.jsx
// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <AuthProvider>
//       <RouterProvider router={router} />,
//     </AuthProvider>
//   </StrictMode>
// );

