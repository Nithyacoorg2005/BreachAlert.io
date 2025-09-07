import Sidebar from "../Components/Sidebar";
import BreachChecker from "../Components/BreachChecker";
import History from "../Components/History";
import { useState } from "react";

export default function MainPage() {
  const [user] = useState(localStorage.getItem("user") || "Guest");

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar user={user} />

      {/* Main content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Welcome, {user} 👋</h1>

        {/* Breach Checker */}
        <BreachChecker />

        {/* History */}
        <History />
      </main>
    </div>
  );
}
