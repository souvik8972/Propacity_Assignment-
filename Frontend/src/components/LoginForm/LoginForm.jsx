import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { loginRequest, loginSuccess, loginFailure } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast

const LoginForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsRegister((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegister && !name) {
      toast.error("Name is required for registration."); // Toast for missing name
      return;
    }

    if (!email || !password) {
      toast.error("Email and password are required."); // Toast for missing email or password
      return;
    }

    // Start loading
    setLoading(true);
    dispatch(loginRequest());

    try {
      const response = await axios.post(
        isRegister
          ? "http://localhost:3000/api/auth/register"
          : "http://localhost:3000/api/auth/login",
        { username: name, email, password }
      );

      // Handle successful login/register
      dispatch(loginSuccess({ user: response.data.user, token: response.data.token }));
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      toast.success(isRegister ? "Registration successful!" : "Login successful!"); // Success toast
      navigate("/dashboard");
    } catch (err) {
      // Handle errors
      dispatch(loginFailure(err.response?.data?.error || "Failed to authenticate."));
      toast.error(err.response?.data?.error || "Failed to authenticate."); // Error toast
    } finally {
      // Stop loading
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center overflow-hidden justify-center w-full h-[80vh] relative">
      {/* Background Blurred Circles */}
      <div className="w-[500px] h-[500px] rounded-full bg-inFile opacity-5 absolute bottom-[-10px] left-[-100px] backdrop-blur-md"></div>
      <div className="w-[300px] h-[300px] rounded-full bg-inFile opacity-10 absolute right-[-120px] top-1 backdrop-blur-md"></div>

      {/* Form with Animation */}
      <motion.form
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        onSubmit={handleSubmit}
        className="relative z-10 bg-white p-8 rounded shadow-md max-w-sm w-full border border-spacing-3 border-dashed flex flex-col"
      >
        <h2 className="text-2xl text-inFile font-semibold text-center mb-4">
          {isRegister ? "Register" : "Login"}
        </h2>

        {status === "loading" && (
          <p className="text-blue-500 mb-4">Loading...</p> // Indicate loading
        )}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <label className="block" htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {isRegister && (
          <>
            <label className="block text-gray-700" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </>
        )}

        <label className="block text-gray-700" htmlFor="password">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="bg-inFile w-fit m-auto p-2 pl-6 pr-6 border border-inFile text-white rounded-full transition duration-200 ease-in-out hover:bg-white hover:text-inFile active:bg-blue-400 focus:outline-none"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Checking..." : isRegister ? "Register" : "Login"}
        </button>

        <div className="mt-4 text-center">
          <button
            type="button"
            className="text-inFile hover:underline"
            onClick={toggleForm}
            disabled={loading} // Disable toggle button while loading
          >
            {isRegister
              ? "Already have an account? Login"
              : "Need an account? Register"}
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default LoginForm;