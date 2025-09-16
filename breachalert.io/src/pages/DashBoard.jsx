import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../Components/Sidebar";
import BreachChecker from "../Components/BreachChecker";
import History from "../Components/History";

export default function DashBoard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ add loading
  const [msgIndex, setMsgIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/signup");
    } else {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser.username);
    }
    setLoading(false); // ✅ stop loading once checked
  }, [navigate]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning 🌞";
    if (hour < 18) return "Good Afternoon 🌤️";
    if (hour < 21) return "Good Evening 🌆";
    return "Good Night 🌙";
  };

  const messages = [
    "Ready to secure your data? 🔒",
    "Your privacy matters 💡",
    "Stay safe, stay smart 🚀",
    "Keep exploring, keep learning 📚",
    "Every click makes you safer 🌟",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  // ✅ Show loading screen instead of returning null
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-950 text-white">
        <motion.div
          className="text-xl font-semibold text-blue-400"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading Dashboard...
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "Outfit" }} className="flex h-screen bg-gray-950 text-white">
      <Sidebar user={user} />

      <motion.main
        className="flex-1 p-8 overflow-y-auto"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {/* Greeting Card */}
        <motion.div
          className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl p-6 mb-8 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            {getGreeting()}, {user} 👋
          </h1>
          <p className="text-gray-300 mt-1 text-lg italic">{messages[msgIndex]}</p>
          <p className="text-gray-400 mt-2">{today}</p>
        </motion.div>

        {/* Features */}
        <BreachChecker />
        <History />
      </motion.main>
    </div>
  );
}
