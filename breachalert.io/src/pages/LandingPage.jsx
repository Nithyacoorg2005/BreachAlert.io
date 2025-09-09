import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  CheckCircle,
  Users,
  Lock,
  Eye,
  EyeOff,
  Linkedin,
  Twitter,
  Github,
} from "lucide-react";

const Card = ({ icon, title, description, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
  };

  return (
    <motion.div
      ref={ref}
      className="p-8 bg-gray-700/50 backdrop-blur-md rounded-2xl border border-gray-600/50 shadow-lg text-center"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

const AuthSection = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authComplete, setAuthComplete] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.msg);
        localStorage.setItem("user", JSON.stringify({ username, email }));
        navigate("/main");
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        navigate("/main");
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center ...">
      <h2 className="...">{isSignup ? "Sign Up" : "Login"}</h2>
      <p className="...">
        {isSignup
          ? "Join us and protect your digital identity."
          : "Welcome back to your digital fortress."}
      </p>

      <form onSubmit={isSignup ? handleSignup : handleLogin} className="w-full space-y-4">
        {isSignup && (
          <>
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email"  />
          </>
        )}
        {!isSignup && (
          <input type="email" placeholder="Email"  />
        )}
        <div className="relative">
          <input type={showPassword ? "text" : "password"} placeholder="Password" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-4">
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <button type="submit" className="...">
          {isSignup ? "Sign Up" : "Login"}
        </button>
      </form>

      <button
        onClick={() => setIsSignup(!isSignup)}
        className="mt-6 text-sm text-gray-400 hover:underline"
      >
        {isSignup ? "Already have an account? Login" : "New user? Sign Up"}
      </button>
    </div>
  );
};

const LandingPage = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-100px 0px" });
  const aboutRef = useRef(null);
  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px 0px" });
  const contactRef = useRef(null);
  const contactInView = useInView(contactRef, { once: true, margin: "-100px 0px" });

  const headingVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3, ease: "easeOut" } },
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.5 } },
  };
  const listVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div style={{fontFamily:"Outfit"}} className="relative min-h-screen bg-[#0f2257] text-white  overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-[#0f2257] -z-10" />
      <div className="fixed inset-0 bg-blue-900 opacity-30 animate-pulse-slow -z-10"></div>

      {/* Hero Section */}
      <section ref={heroRef} className="h-screen flex flex-col items-center justify-center text-center px-8 relative z-10">
        <motion.h1 style={{fontFamily:"Outfit"}}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#ffcc00] to-yellow-300 mb-4 max-w-4xl"
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={headingVariants}
        >
          Protect Your Digital Identity in Seconds
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8"
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={textVariants}
        >
          Check if your email or phone number has ever been leaked in a data breach.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.button
            className="px-8 py-4 rounded-full font-bold text-lg bg-[#ffcc00] text-black shadow-lg hover:scale-105 transition-transform"
            variants={listVariants}
            onClick={() =>
              document
                .getElementById("auth-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Create Account
          </motion.button>
          <motion.button
            className="px-8 py-4 rounded-full font-bold text-lg bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors hover:scale-105"
            variants={listVariants}
            onClick={() =>
              document
                .getElementById("auth-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Login
          </motion.button>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-20 px-8 bg-blue-950 z-10">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h2
            className="text-4xl font-bold text-white mb-4"
            initial="hidden"
            whileInView="visible"
            variants={headingVariants}
            viewport={{ once: true }}
          >
            Who We Are
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 mb-8"
            initial="hidden"
            whileInView="visible"
            variants={textVariants}
            viewport={{ once: true }}
          >
            We are the people behind <strong>BreachAlert.io</strong>. Our mission is to
            empower you with awareness about your digital safety.
          </motion.p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}
          >
            <Card
              icon={<Users className="text-[#ffcc00] w-12 h-12" />}
              title="Dedicated Team"
              description="Our team is passionate about digital privacy and creating tools that are both effective and easy to use."
              delay={0}
            />
            <Card
              icon={<Lock className="text-[#ffcc00] w-12 h-12" />}
              title="Privacy First"
              description="We believe your data is your own. We never store your input or your results, ensuring complete anonymity."
              delay={0.2}
            />
          </motion.div>
        </div>
      </section>

      {/* Auth Section */}
      <section id="auth-section" className="py-20 px-8 bg-[#0f2257] z-10">
        <AuthSection />
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-20 px-8 bg-blue-950 z-10">
        <div className="container mx-auto max-w-2xl text-center">
          <motion.h2
            className="text-4xl font-bold text-white mb-4"
            initial="hidden"
            whileInView="visible"
            variants={headingVariants}
            viewport={{ once: true }}
          >
            Get in Touch
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 mb-8"
            initial="hidden"
            whileInView="visible"
            variants={textVariants}
            viewport={{ once: true }}
          >
            Have questions or feedback? We'd love to hear from you.
          </motion.p>
          <form className="space-y-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-6 py-4 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffcc00] transition-all"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-6 py-4 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffcc00] transition-all"
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full px-6 py-4 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffcc00] transition-all"
            ></textarea>
            <button
              type="submit"
              className="w-full px-6 py-4 rounded-xl font-bold text-lg bg-[#ffcc00] text-black shadow-lg hover:scale-105 transition-transform"
            >
              Send Message
            </button>
          </form>
          <div className="flex justify-center space-x-6 mt-8">
            <a href="#" className="text-white hover:text-[#ffcc00] transition-colors">
              <Linkedin size={28} />
            </a>
            <a href="#" className="text-white hover:text-[#ffcc00] transition-colors">
              <Twitter size={28} />
            </a>
            <a href="#" className="text-white hover:text-[#ffcc00] transition-colors">
              <Github size={28} />
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 10s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
