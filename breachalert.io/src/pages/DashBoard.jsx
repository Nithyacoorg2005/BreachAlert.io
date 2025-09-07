import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar"
import BreachChecker from "../Components/BreachChecker"
import History from "../Components/History"

export default function Dashboard() {
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/signup");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar user={user} />
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Welcome, {user} 👋</h1>
        <BreachChecker />
        <History />
      </main>
    </div>
  );
}
