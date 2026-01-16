import { useEffect, useState } from "react";
import API from "../../api/api";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await API.get("/bookings/admin");
    setBookings(res.data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/bookings/admin/${id}`, { status });
    fetchBookings();
  };

  const deleteBooking = async (id) => {
  if (!window.confirm("Delete this booking?")) return;

  await API.delete(`/bookings/admin/${id}`);
  fetchBookings();
};

  return (
    <div style={{ padding: "30px" }}>
      <h2>Admin Booking Viewer</h2>

      <table className="admin-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Program</th>
      <th>Date</th>
      <th>Time</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>
    {bookings.map((b) => (
      <tr key={b._id}>
        <td>{b.name}</td>
        <td>{b.trainingType}</td>
        <td>{b.date}</td>
        <td>{b.time}</td>
        <td>
          <span className={`status ${b.status}`}>
            {b.status}
          </span>
        </td>
        <td className="actions">
          <button
            className="approve"
            onClick={() => updateStatus(b._id, "approved")}
          >
            ✓
          </button>

          <button
            className="reject"
            onClick={() => updateStatus(b._id, "rejected")}
          >
            ✕
          </button>

          <button
            className="delete"
            onClick={() => deleteBooking(b._id)}
          >
            🗑
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default AdminBookings;

