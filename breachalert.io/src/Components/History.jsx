export default function History() {
  const history = JSON.parse(localStorage.getItem("history") || "[]");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📜 History</h1>
      {history.length === 0 ? (
        <p>No searches yet.</p>
      ) : (
        <table className="w-full bg-gray-800 rounded">
          <thead>
            <tr>
              <th className="p-2 text-left">Input</th>
              <th className="p-2 text-left">Result</th>
              <th className="p-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, idx) => (
              <tr key={idx} className="border-t border-gray-700">
                <td className="p-2">{item.input}</td>
                <td className="p-2">{item.result}</td>
                <td className="p-2">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
