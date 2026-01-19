import { useEffect, useState } from "react";
import API from "../api/api";
import Loader from "../components/Loader";
import Slideshow from "../components/NoticeSlideshow";

const RETRY_DELAY = 3000; // 3 seconds

const Notice = () => {
  /**
   * null  -> loading (KEEP loader)
   * []    -> loaded but empty
   * [..]  -> loaded with data
   */
  const [notices, setNotices] = useState(null);

  useEffect(() => {
    let mounted = true;
    let retryTimeout;

    const fetchNotices = async () => {
      try {
        const res = await API.get("/notices");

        if (!mounted) return;

        // ✅ SUCCESS → END LOADING
        setNotices(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        // ❗ FAILURE → backend still cold
        // KEEP loader + retry
        if (!mounted) return;

        retryTimeout = setTimeout(fetchNotices, RETRY_DELAY);
      }
    };

    fetchNotices();

    return () => {
      mounted = false;
      clearTimeout(retryTimeout);
    };
  }, []);

  // 🔥 NOTHING ELSE RENDERS UNTIL DATA EXISTS
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

