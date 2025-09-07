export default function Profile() {
  const user = localStorage.getItem("user") || "Guest";

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">👤 Profile</h2>
      <p className="mb-2">Username: {user}</p>
      <p>Email: example@mail.com</p>
      <button className="mt-4 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
        Edit Profile
      </button>
    </div>
  );
}
