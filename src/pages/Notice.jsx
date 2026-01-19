import { useEffect, useState } from "react";
import API from "../api/api";
import Loader from "../components/Loader";
import Slideshow from "../components/NoticeSlideshow";

const RETRY_DELAY = 3000; // 3 seconds

const Notice = () => {
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
        // ❗ FAILURE → KEEP LOADER + RETRY
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

  return (
    <div className="notice-page">
      <div className="notice-box">
        <div className="notice-header">
          <div className="notice-channel-pic"></div>
          <h2 className="notice-channel-name">THAKUR GYM</h2>
        </div>

        {/* 🔥 LOADER STAYS UNTIL SUCCESS */}
        {notices === null ? (
          <Loader />
        ) : notices.length === 0 ? (
          <p style={{ textAlign: "center" }}>No notices available</p>
        ) : (
          <>
            <h5>
              Posted on:{" "}
              {notices[0]?.createdAt
                ? new Date(notices[0].createdAt).toLocaleString()
                : "—"}
            </h5>

            <div className="notice-title">
              <h3>{notices[0].title}</h3>
              <p>{notices[0].description}</p>
            </div>

            <div className="notice-slider">
              <Slideshow media={notices[0].media || []} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Notice;
