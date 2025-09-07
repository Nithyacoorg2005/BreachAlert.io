import Sidebar from "../Components/Sidebar";
import BreachChecker from "../Components/BreachChecker";
import History from "../Components/History";
import Profile from "../Components/Profile";
import { useState } from "react";

export default function MainPage() {
  const [section, setSection] = useState("checker");
  const user = localStorage.getItem("user") || "Guest";

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar user={user} onNavigate={setSection} />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Welcome, {user} 👋</h1>

        
        {section === "checker" && <BreachChecker />}
        {section === "history" && <History />}
        {section === "profile" && <Profile />}
      </main>
    </div>
  );
}