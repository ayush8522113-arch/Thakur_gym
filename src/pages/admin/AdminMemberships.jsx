import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/admin.css";
import API from "../../api/api";

const AdminMemberships = () => {
  const [payments, setPayments] = useState([]);

  const formatDateTime = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString();
  };

  const fetchPendingMemberships = async () => {
    try {
      const res = await API.get("/payments/admin/pending");
      setPayments(res.data);
    } catch (err) {
      console.error("Failed to fetch memberships", err);
    }
  };

  const downloadSlip = async (paymentId) => {
  try {
    const res = await API.get(
      `/payments/slip/${paymentId}`,
      { responseType: "blob" }
    );

    const url = window.URL.createObjectURL(
      new Blob([res.data], { type: "application/pdf" })
    );

    const link = document.createElement("a");
    link.href = url;
    link.download = `payment-slip-${paymentId}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Slip download failed", err);
    alert("Failed to download payment slip");
  }
};


  const approveMembership = async (paymentId) => {
    const confirmed = window.confirm(
      "Approve this membership for the user?"
    );

    if (!confirmed) return;

    try {
      await API.post(`/payments/admin/approve/${paymentId}`);
      setPayments((prev) => prev.filter((p) => p._id !== paymentId));
    } catch (err) {
      console.error("Approval failed", err);
      alert("Failed to approve membership");
    }
  };

  useEffect(() => {
    fetchPendingMemberships();
  }, []);

  return (
    <div className="admin-page">
      <div style={{ padding: "30px" }}>
        
        {/* ===== ADMIN HEADER ===== */}
        <div className="admin-header">
          <h2>Admin Panel</h2>

          <div className="admin-nav">
            <Link to="/admin/notices">Notices</Link>
            <Link to="/admin/bookings">Bookings</Link>
            <Link to="/admin/users">Users</Link>
            <Link to="/admin/memberships" className="active">
              Memberships
            </Link>
            <Link to="/admin/stats">Stats</Link>
          </div>
        </div>

        {/* ===== PAGE INTRO ===== */}
        <div className="admin-card">
          <h3>Membership Approvals</h3>
          <p style={{ color: "#666", fontSize: "14px" }}>
            Approve paid memberships to activate user access
          </p>
        </div>

        {/* ===== MEMBERSHIP TABLE ===== */}
        <div className="admin-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Paid On</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No pending memberships
                  </td>
                </tr>
              ) : (
                payments.map((p) => (
                  <tr key={p._id}>
                    <td>{p.user?.name}</td>
                    <td>{p.user?.email}</td>
                    <td>{p.membershipType.toUpperCase()}</td>
                    <td>₹{p.amount}</td>
                    <td>{formatDateTime(p.createdAt)}</td>
                    <td>
                      <button
                        className="update"
                        onClick={() => approveMembership(p._id)}
                      >
                        Approve
                      </button>
                    </td>

<td>
  <button
  className="update"
  onClick={() => downloadSlip(p._id)}
>
  Download Slip
</button>

</td>


                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default AdminMemberships;
