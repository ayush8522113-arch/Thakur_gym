import { useEffect, useState } from "react";
import API from "../../api/api";
import { Link } from "react-router-dom";
import "../../styles/admin.css";

const AdminNotices = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notices, setNotices] = useState([]);
  const [media, setMedia] = useState([]);

const handleFileAdd = (e) => {
  const files = Array.from(e.target.files);
  setMedia((prev) => [...prev, ...files]);
};

  // 🔹 Fetch notices
  const fetchNotices = async () => {
    const res = await API.get("/notices");
    setNotices(res.data);
  };

  useEffect(() => {
    fetchNotices();
  }, []);

const uploadMedia = async (noticeId) => {
  const formData = new FormData();

  media.forEach((file) => {
    formData.append("media", file);
  });

  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/api/notices/${noticeId}/media`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("Media upload failed");
  }
};


  // 🔹 THIS WAS MISSING ❗
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    const res = await API.post(
      "/notices",
      { title, description },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const noticeId = res.data.noticeId;

    alert("Notice created");

    // NOW upload media separately
    if (media.length > 0) {
      await uploadMedia(noticeId);
    }

    fetchNotices();
    setTitle("");
    setDescription("");
    setMedia([]);
  } catch (err) {
    console.error(err.response?.data || err);
    alert("Failed to create notice");
  }
};



  const deleteNotice = async (id) => {
    await API.delete(`/notices/${id}`);
    fetchNotices();
  };

  return (
    <div className="admin-page">
    <div style={{ padding: "30px" }}>
      {/* ADMIN HEADER */}
      <div className="admin-header">
        <h2>Admin Panel</h2>
        <div className="admin-nav">
          <Link to="/admin/notices" className="active">Notices</Link>
          <Link to="/admin/bookings">Bookings</Link>
          <Link to="/admin/stats">Stats</Link>
           <Link to="/admin/users">Users</Link>
           <Link to="/admin/contacts" className="admin-nav-btn">
  Contacts
</Link>

        </div>
      </div>

      {/* CREATE NOTICE */}
      <div className="admin-card">
        <h3>Create New Notice</h3>
<form
  onSubmit={handleSubmit}
  encType="multipart/form-data"
  >        
  <input
  type="text"
  name="title"
  placeholder="Notice Title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>


        <textarea
  name="description"
  placeholder="Notice Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>


<div className="media-upload-box">
  {/* Existing selected files preview */}
  <div className="media-preview-grid">
    {media.map((file, index) => (
      <div key={index} className="media-preview-item">
        {file.type.startsWith("video") ? (
          <video src={URL.createObjectURL(file)} />
        ) : (
          <img src={URL.createObjectURL(file)} alt="preview" />
        )}
      </div>
    ))}

    {/* + BUTTON */}
    <label className="add-media-btn">
      +
      <input
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={handleFileAdd}
        hidden
      />
    </label>
  </div>
</div>


        <button type="submit">Publish Notice</button>
</form>
      </div>

      {/* NOTICE LIST */}
      <div className="notice-grid">
        {notices.map((n) => (
          <div className="notice-card" key={n._id}>
            <h4>{n.title}</h4>
            <p>{n.description}</p>

            <div className="notice-actions">
              <button
                className="danger"
                onClick={() => deleteNotice(n._id)}
              >
                Delete
              </button>
              
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default AdminNotices;
