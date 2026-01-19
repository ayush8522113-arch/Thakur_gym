import Slideshow from "../components/NoticeSlideshow";
import API from "../api/api";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
const Notice = () => {
  const [notices, setNotices] = useState([]);
const [loading, setLoading] = useState(true);
  useEffect(() => {
  const fetchNotices = async () => {
    try {
      // Wake backend (Render cold start fix)
      await API.get("/health");

      const res = await API.get("/notices");
      setNotices(res.data);
    } catch (err) {
      console.error("Failed to load notices", err);
    } finally {
      setLoading(false);
    }
  };

  fetchNotices();
}, []);

  const latestNotice = notices[0];

 if (loading) {
    return <Loader text="Loading reviews, please wait…" />;
  }

  return (
    <div className="notice-page">
      <div className="notice-box">

        {/* HEADER */}
        <div className="notice-header">
          <div className="notice-channel-pic"></div>
          <h2 className="notice-channel-name">THAKUR GYM</h2>
          <h5>
            Posted on:{" "}
            {new Date(latestNotice.createdAt).toLocaleString()}
          </h5>
        </div>

        {/* NOTICE CONTENT */}
        <div className="notice-title">
          <h3>{latestNotice.title}</h3>
          <p>{latestNotice.description}</p>
        </div>

        {/* MEDIA (FIXED) */}
        <div className="notice-slider">
          <Slideshow media={latestNotice.media} />
        </div>

      </div>
    </div>
  );
};

export default Notice;
