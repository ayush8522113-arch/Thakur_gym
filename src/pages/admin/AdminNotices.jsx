import { useEffect, useState } from "react";
import API from "../../api/api";
import { Link } from "react-router-dom";
import "../../styles/admin.css";

const AdminNotices = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notices, setNotices] = useState([]);
  const [media, setMedia] = useState([]);


  // Fetch notices
  const fetchNotices = async () => {
    const res = await API.get("/notices");
    setNotices(res.data);
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // Handle single file selection
 const handleFileChange = (e) => {
  const files = Array.from(e.target.files);

  if (files.length > 10) {
    alert("You can upload maximum 10 files");
    return;
  }

  setMedia(files);
};


  // Upload media AFTER notice creation
  const uploadMedia = async (noticeId) => {
    const formData = new FormData();
    media.forEach((file) => {
  formData.append("media", file);
});


    const token = localStorage.getItem("token");

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/notices/${noticeId}/upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error(data);
      throw new Error(data.message || "Media upload failed");
    }
  };

  // Create notice (text first, then media)
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

      if (media) {
        await uploadMedia(noticeId);
      }

      alert("Notice created successfully");
      fetchNotices();
      setTitle("");
      setDescription("");
      setMedia(null);
    } catch (err) {
      console.error(err);
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
            <Link to="/admin/contacts">Contacts</Link>
            <Link to="/admin/memberships">Memberships</Link>
          </div>
        </div>

        {/* CREATE NOTICE */}
        <div className="admin-card">
          <h3>Create New Notice</h3>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Notice Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              placeholder="Notice Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {/* MEDIA UPLOAD */}
            <div className="media-upload-box">
              <div className="media-preview-grid">
                {media && (
                  <div className="media-preview-item">
                    {media.type.startsWith("video") ? (
                      <video
                        src={URL.createObjectURL(media)}
                        controls
                      />
                    ) : (
                      <img
                        src={URL.createObjectURL(media)}
                        alt="preview"
                      />
                    )}
                  </div>
                )}

                {/* + BUTTON */}
                {media.length < 10 && (
    <label className="add-media-btn">
      +
      <input
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={handleFileChange}
        hidden
      />
    </label>
  )}
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
