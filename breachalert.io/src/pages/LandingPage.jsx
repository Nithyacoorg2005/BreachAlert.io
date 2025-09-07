import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const [isSignup, setIsSignup] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();

    if (isSignup) {
      // Save new user
      localStorage.setItem("user", JSON.stringify({ username, password }));
      alert("Signup successful! Please login.");
      setIsSignup(false); // switch to login form
    } else {
      // Login check
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.username === username && storedUser.password === password) {
        alert("Login successful!");
        navigate("/main"); // redirect after login
      } else {
        alert("Invalid credentials!");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">BreachAlert.io</h1>

      <form onSubmit={handleAuth} className="bg-gray-800 p-6 rounded shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4">{isSignup ? "Signup" : "Login"}</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full mb-3 p-2 rounded text-black"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-3 p-2 rounded text-black"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded mt-2"
        >
          {isSignup ? "Signup" : "Login"}
        </button>
      </form>

      <button
        onClick={() => setIsSignup(!isSignup)}
        className="mt-4 underline"
      >
        {isSignup ? "Already have an account? Login" : "New user? Signup"}
      </button>
    </div>
  );
}
