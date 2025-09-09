import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Sidebar({ user, onNavigate }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const sidebarVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.aside style={{fontFamily:"outfit"}}
      className="w-64 bg-gray-900 p-6 flex flex-col justify-between shadow-xl"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    >
      <div>
        <motion.h2 className="text-2xl font-bold mb-8 text-white">BreachAlert.io</motion.h2>
        <motion.ul variants={sidebarVariants}>
          {["Profile", "Breach Checker", "History"].map((item) => (
            <motion.li
              key={item}
              className="text-lg text-gray-400 hover:text-blue-400 hover:bg-gray-800 p-2 rounded-lg transition-all duration-200 cursor-pointer"
              onClick={() => onNavigate(item.toLowerCase().replace(" ", ""))}
              variants={itemVariants}
              whileHover={{ x: 5 }}
            >
              {item}
            </motion.li>
          ))}
        </motion.ul>
      </div>
      <motion.button
        onClick={handleLogout}
        className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-full text-white font-bold transition-transform transform-gpu hover:scale-105"
        whileHover={{ scale: 1.05 }}
      >
        Logout
      </motion.button>
    </motion.aside>
  );
}
