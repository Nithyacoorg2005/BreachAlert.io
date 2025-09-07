export default function Sidebar({ user, onNavigate }) {
  return (
    <aside className="w-64 bg-gray-800 p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-6">BreachAlert.io</h2>
        <ul>
          <li className="mb-4 cursor-pointer" onClick={() => onNavigate("profile")}>Profile</li>
          <li className="mb-4 cursor-pointer" onClick={() => onNavigate("checker")}>Breach Checker</li>
          <li className="mb-4 cursor-pointer" onClick={() => onNavigate("history")}>History</li>
        </ul>
      </div>
      <button
        onClick={() => {
          localStorage.removeItem("user");
          window.location.href = "/";
        }}
        className="bg-red-500 hover:bg-red-600 p-2 rounded"
      >
        Logout
      </button>
    </aside>
  );
}
