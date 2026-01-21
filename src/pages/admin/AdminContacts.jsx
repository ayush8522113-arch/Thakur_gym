import { useEffect, useState } from "react";
import API from "../../api/api";
import{Link} from "react-router-dom";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const res = await API.get("/contacts");
      setContacts(res.data);
    };

    fetchContacts();
  }, []);

  return (
    <div className="admin-page">
      <div className="admin-header">
         <h2>Contact Messages</h2>
                <div className="admin-nav">
                  <Link to="/admin/notices" className="active">Notices</Link>
                  <Link to="/admin/bookings">Bookings</Link>
                  <Link to="/admin/stats">Stats</Link>
                  <Link to="/admin/users">Users</Link>
                  <Link to="/admin/contacts">Contacts</Link>
                  <Link to="/admin/memberships">Memberships</Link>
                  <Link to="/admin/reviews">Reviews</Link>
                  
                </div>
     
</div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {contacts.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.message}</td>
              <td>{new Date(c.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminContacts;
