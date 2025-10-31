import { HiOutlineEye } from "react-icons/hi2";
import { HiOutlineEyeSlash } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { use, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import PrivateRoute from "../../provider/PrivateRoute";

export default function Login() {

  // after login, go to specific Path. check PrivateRoute.jsx
  const location = useLocation()
  const navigate = useNavigate()
  console.log(location)

  const [showPass, setShowPass] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { loginUser, setUserData, googleSignIn } = use(AuthContext);

  const togglePassword = () => {
    setShowPass(!showPass);
  };

  const checkPassword = (event) => {
    const password = event.target.value;
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
    } else {
      setErrorMsg("");
    }
    console.log(password);
  };

  // login
  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password)

    loginUser(email, password)
      .then((res) => {
        const user = res.user;
        setUserData(user);
        alert("Successfully Loged in.");
        navigate(`${location.state ? location.state : "/"}`);

        event.target.reset();
      })
      .catch((error) => {
        alert(error.message);
        console.log(error)
      });
  };
  // google login
  const googleHandler = () => {
    googleSignIn()
      .then((res) => {
        const user = res.user;
        setUserData(user);
        alert("Successfully Loged in.");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        alert(error.message);
        console.log(error.message)
      });
  };

  return (
    <div className="h-screen w-full flex items-center px-4 bg-green-200/10">
      <title>Login Form</title>
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-black text-black/70 mb-2">
            Welcome Back!
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            Today is a new day. It's your day. You shape it.
            <br />
            Sign in to start managing your projects.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="space-y-2">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                required
                className="placeholder-black/30 text-sm w-full py-2 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C5F5D] focus:border-transparent"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  onChange={checkPassword}
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="At least 8 characters"
                  required
                  className="placeholder-black/30 text-sm w-full py-2 px-4 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C5F5D] focus:border-transparent"
                />
                {/* click toggle eye */}
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPass ? (
                    <HiOutlineEyeSlash className="h-5 w-5" />
                  ) : (
                    <HiOutlineEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            {/* error msg */}
            <h1 className="text-xs text-red-500">{errorMsg}</h1>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link to="/auth/forgotPassword">
              <button
                type="button"
                className="text-[#3B82F6] hover:text-blue-700 text-sm font-medium transition-colors"
              >
                Forgot Password?
              </button>
            </Link>
          </div>

          {/* Submit login Button */}
          <button
            type="submit"
            className="w-full p-2 mt-2 bg-green-700 hover:bg-green-700/50 text-white font-md rounded-lg transition-colors"
          >
            Log in
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center mt-5">
            <div className="border-t border-gray-200 flex-1"></div>
            <span className="px-4 text-gray-500 text-sm">Or</span>
            <div className="border-t border-gray-200 flex-1"></div>
          </div>

          <div className="flex flex-col justify-center items-center gap-3">
            {/* google button */}
            <button
              onClick={googleHandler}
              type="submit"
              className="w-full p-2 mt-2 bg-green-700/10 hover:bg-green-500/50 text-black/70 font-semibold text-sm rounded-lg transition-colors"
            >
              <div className="flex items-center justify-center gap-2">
                <FcGoogle size={20} />
                <span>Sign in with Google</span>
              </div>
            </button>
          </div>

          <div className="text-center mt-3">
            <p className="text-gray-600 text-sm">
              Don't you have an account?{" "}
              <Link
                state={location.state}
                to="/auth/register"
                className="text-accent hover:text-primary font-semibold transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>

        {/* Copyright */}
        <div className="text-center mt-10">
          <p className="text-gray-400 text-xs">© 2025 ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </div>
  );
}
