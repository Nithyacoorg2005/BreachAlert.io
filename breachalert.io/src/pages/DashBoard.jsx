import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../Components/Sidebar";
import BreachChecker from "../Components/BreachChecker";
import History from "../Components/History";

export default function DashBoard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/signup");
    } else {
      setUser(JSON.parse(storedUser).username);
    }
  }, [navigate]);

  if (!user) return null;

  const greetingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div style={{fontFamily:"Outfit"}} className="flex h-screen bg-gray-950 text-white">
      <Sidebar user={user} />
      <motion.main
        className="flex-1 p-8 overflow-y-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 
          className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
          variants={greetingVariants}
        >
          Welcome, {user} 👋
        </motion.h1>
        <BreachChecker />
        <History />
      </motion.main>
    </div>
  );
}
