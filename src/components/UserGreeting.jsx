import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserGreeting = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const loadUser = () => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      setUser(null);
      return;
    }
    try {
      setUser(JSON.parse(stored));
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser(); // initial load

    // 👂 listen for login/logout
    window.addEventListener("auth-change", loadUser);

    return () => {
      window.removeEventListener("auth-change", loadUser);
    };
  }, []);

  if (!user) return null;

  const name =
    user.name || user.username || user.fullName || "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // 🔔 notify app again
    window.dispatchEvent(new Event("auth-change"));

    navigate("/login");
  };

  return (
    <div className="user-greeting">
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      <h4>
        Hello🤗, {name}
        {user.role === "admin" && (
          <span className="admin-badge"> (Admin)</span>
        )}
      </h4>
    </div>
  );
};

export default UserGreeting;
