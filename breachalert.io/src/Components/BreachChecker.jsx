import React, { useState } from "react";

export default function BreachChecker() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCheck = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("http://localhost:5000/api/breach-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          🔍 Email Breach Checker
        </h1>
        <form onSubmit={handleCheck} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Checking..." : "Check Now"}
          </button>
        </form>

        {/* Results */}
        <div className="mt-6">
          {error && (
            <div className="text-red-500 text-center font-semibold">
              ⚠️ {error}
            </div>
          )}

          {result && result.breaches && result.breaches.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2 text-gray-700">
                ⚠️ Found {result.breaches.length} breaches:
              </h2>
              <ul className="space-y-3">
                {result.breaches.map((breach, i) => (
                  <li
                    key={i}
                    className="p-3 border rounded-xl bg-gray-50 shadow-sm"
                  >
                    <p className="font-bold text-gray-800">{breach.name}</p>
                    <p className="text-sm text-gray-600">
                      Source: {breach.domain}
                    </p>
                    <p className="text-sm text-gray-500">
                      Date: {breach.breachDate}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result && result.breaches && result.breaches.length === 0 && (
            <div className="text-green-600 font-semibold text-center">
              ✅ Good news! No breaches found for {email}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
