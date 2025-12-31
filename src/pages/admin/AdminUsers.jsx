import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/admin.css";
import API from "../../api/api"; // your axios instance

const AdminUsers = () => {

    
  /* ===============================
     STATE
  =============================== */

  const formatDateTime = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString() + " " + d.toLocaleTimeString();
};


  // Registered users (from DB later)
  const [registeredUsers, setRegisteredUsers] = useState([]);

const updateRegisteredUserDate = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to update the start date to current date & time?"
  );

  if (!confirmed) return;

  const res = await API.put(`/users/${id}/update-date`);
  setRegisteredUsers((prev) =>
    prev.map((u) => (u._id === id ? res.data : u))
  );
};




  // Manual users (from DB later)
  const [manualUsers, setManualUsers] = useState([]);

  // Manual user form
  const [showForm, setShowForm] = useState(false);
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  
const updateManualUserDate = async (id) => {
  const confirmed = window.confirm(
    "Update this user's start date to current date & time?"
  );

  if (!confirmed) return;

  const res = await API.put(`/manual-users/${id}/update-date`);
  setManualUsers((prev) =>
    prev.map((u) => (u._id === id ? res.data : u))
  );
};




  /* ===============================
     HANDLERS (PLACEHOLDERS)
  =============================== */

  const deleteUser = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this user? This action cannot be undone."
  );

  if (!confirmed) return;

  await API.delete(`/users/${id}`);
  setRegisteredUsers((prev) => prev.filter((u) => u._id !== id));
};


  const deleteManualUser = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this manual user?"
  );

  if (!confirmed) return;

  await API.delete(`/manual-users/${id}`);
  setManualUsers((prev) => prev.filter((u) => u._id !== id));
};



const addManualUser = async () => {
  if (!userName) return;

  try {
    const res = await API.post("/manual-users", {
      name: userName,
      phone,
      email,
    });

    setManualUsers((prev) => [res.data, ...prev]);

    setUserName("");
    setPhone("");
    setEmail("");
    setShowForm(false);
  } catch (err) {
    console.error("Add manual user failed:", err.response?.data || err.message);
    alert("Failed to add user. Check console.");
  }
};


useEffect(() => {

const fetchRegisteredUsers = async () => {
    try {
      const res = await API.get("/users");
      setRegisteredUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch registered users", err);
    }
  };

  fetchRegisteredUsers();

  const fetchManualUsers = async () => {
    try {
      const res = await API.get("/manual-users");
      setManualUsers(res.data);

      // optional cache
      localStorage.setItem(
        "manualUsersCache",
        JSON.stringify(res.data)
      );
    } catch {
      const cached = localStorage.getItem("manualUsersCache");
      if (cached) {
        setManualUsers(JSON.parse(cached));
      }
    }
  };

  fetchManualUsers();
}, []);



  /* ===============================
     UI
  =============================== */

  return (
    <div className="admin-page">
      <div style={{ padding: "30px" }}>
        
        {/* ===== ADMIN HEADER ===== */}
        <div className="admin-header">
          <h2>Admin Panel</h2>

          <div className="admin-nav">
            <Link to="/admin/notices">Notices</Link>
            <Link to="/admin/bookings">Bookings</Link>
            <Link to="/admin/users" className="active">Users</Link>
            <Link to="/admin/stats">Stats</Link>
          </div>
        </div>

        {/* ===== PAGE INTRO ===== */}
        <div className="admin-card">
          <h3>Thakur Gym User Management</h3>
          <p style={{ color: "#666", fontSize: "14px" }}>
            Manage registered users and manually added gym members
          </p>
        </div>

        {/* ===============================
            REGISTERED USERS TABLE
        =============================== */}
        <div className="admin-card">
          <h3>Registered Users</h3>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Start Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {registeredUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No registered users
                  </td>
                </tr>
              ) : (
                registeredUsers.map((u) => (
                  <tr key={u._id}>
                    <td data-label="Name">{u.name}</td>
                    <td data-label="Email">{u.email}</td>
                    <td date-label="phone">{u.phone}</td>
                   <td data-label="Start Date">{formatDateTime(u.startDate)
}</td>

                   <td  data-label="Action">

  <button
    className="update"
    onClick={() => updateRegisteredUserDate(u._id)}
  >
    Update
  </button>

  <button
    className="danger"
    onClick={() => deleteUser(u._id)}
  >
    Delete
  </button>
</td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ===============================
            MANUAL USERS HEADER
        =============================== */}
        <div className="table-header">
          <h3>Manual Users</h3>
          <button className="add-btn" onClick={() => setShowForm(true)}>
            +
          </button>
        </div>

        {/* ===============================
            MANUAL USERS TABLE
        =============================== */}
        <div className="admin-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Start Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {manualUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No manual users added
                  </td>
                </tr>
              ) : (
                manualUsers.map((u) => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.phone}</td>
                    <td>{u.email}</td>
                    <td>{formatDateTime(u.startDate)}</td>


                    <td>
  <button
    className="update"
    onClick={() => updateManualUserDate(u._id)}
  >
    Update
  </button>

  <button
    className="danger"
    onClick={() => deleteManualUser(u._id)}
  >
    Delete
  </button>
</td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ===============================
            ADD MANUAL USER FORM
        =============================== */}
        {showForm && (
          <div className="admin-card">
            <h3>Add Manual User</h3>

            <input
              placeholder="Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

            <input
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button onClick={addManualUser}>Add User</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
