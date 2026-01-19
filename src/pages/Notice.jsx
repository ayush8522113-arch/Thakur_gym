import { useEffect, useState } from "react";
import API from "../api/api";
import Loader from "../components/Loader";
import Slideshow from "../components/NoticeSlideshow";

const Notice = () => {
  /**
   * null  -> loading (show ONLY loader)
   * []    -> loaded but empty
   * [..]  -> loaded with data
   */
  const [notices, setNotices] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchNotices = async () => {
      try {
        const res = await API.get("/notices");
        if (!mounted) return;

        setNotices(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        // ❗ keep loader visible if backend is still waking
        console.error("Notice backend not ready yet...");
      }
    };

    fetchNotices();

    return () => {
      mounted = false;
    };
  }, []);

  // 🔥 CRITICAL FIX:
  // NOTHING else renders until data exists
  if (notices === null) {
    return <Loader />;
  }

  if (notices.length === 0) {
    return (
      <div className="notice-page">
        <div className="notice-box" style={{ textAlign: "center" }}>
          <h3>No notices available</h3>
        </div>
      </div>
    );
  }

  const latestNotice = notices[0];

  return (
    <div className="notice-page">
      <div className="notice-box">
        {/* HEADER */}
        <div className="notice-header">
          <div className="notice-channel-pic"></div>
          <h2 className="notice-channel-name">THAKUR GYM</h2>
          <h5>
            Posted on:{" "}
            {latestNotice?.createdAt
              ? new Date(latestNotice.createdAt).toLocaleString()
              : "—"}
          </h5>
        </div>

        {/* BODY */}
        <div className="notice-title">
          <h3>{latestNotice.title}</h3>
          <p>{latestNotice.description}</p>
        </div>

        <div className="notice-slider">
          <Slideshow media={latestNotice.media || []} />
        </div>
      </div>
    </div>
  );
};

export default Notice;
