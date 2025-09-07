import { useState } from "react";

export default function BreachChecker() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const handleCheck = (e) => {
    e.preventDefault();

    // Mock breach check
    if (input.includes("hack")) {
      setResult("⚠️ Breach found in dummy-site.com (2023)");
    } else {
      setResult("✅ No breaches found!");
    }

    // Save to history
    const history = JSON.parse(localStorage.getItem("history") || "[]");
    history.push({ input, result, date: new Date().toLocaleString() });
    localStorage.setItem("history", JSON.stringify(history));
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-6">
      <form onSubmit={handleCheck} className="flex gap-2">
        <input
          type="text"
          placeholder="Enter email or username"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
          className="flex-1 p-2 rounded text-black"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
        >
          Check
        </button>
      </form>
      {result && <p className="mt-4">{result}</p>}
    </div>
  );
}
