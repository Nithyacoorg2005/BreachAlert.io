import { useEffect, useState } from "react";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("history") || "[]");
    setHistory(saved);
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-lg mt-6">
      <h2 className="text-xl font-bold mb-4">🔍 Search History</h2>
      {history.length === 0 ? (
        <p className="text-gray-400">No searches yet.</p>
      ) : (
        <ul className="space-y-2">
          {history.map((h, i) => (
            <li key={i} className="border-b border-gray-700 pb-2">
              <p><strong>{h.input}</strong> → {h.result}</p>
              <span className="text-gray-400 text-sm">{h.date}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
