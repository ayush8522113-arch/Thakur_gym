import { useEffect, useState } from "react";
import API from "../../api/api";
import { Link } from "react-router-dom";
import "../../styles/admin.css";

const AdminStats = () => {
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    const res = await API.get("/admin/stats");
    setStats(res.data);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) return <p>Loading stats...</p>;

  console.log("ADMIN STATS STATE:", stats);

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <div className="admin-nav">
          <Link to="/admin/notices">Notices</Link>
          <Link to="/admin/bookings">Bookings</Link>
          <Link to="/admin/stats" className="active">Stats</Link>
          <Link to="/admin/users">Users</Link>
        </div>
      </div>

      <div className="stats-grid">
  <div className="stat-card">
    <h3>{stats.totalUsers}</h3>
    <p>Total Gymers</p>
  </div>



  <div className="stat-card">
    <h3>{stats.manualUsersCount}</h3>
    <p>Manual Gymers</p>
  </div>

  <div className="stat-card">
    <h3>{stats.totalBookings}</h3>
    <p>Total Bookings</p>
  </div>

  <div className="stat-card">
    <h3>{stats.pendingBookings}</h3>
    <p>Pending Bookings</p>
  </div>

  <div className="stat-card">
    <h3>{stats.totalNotices}</h3>
    <p>Total Notices</p>
  </div>
</div>

    </div>
  );
};

export default AdminStats;
