import { useEffect, useState } from "react";
import API from "../api/api";
import Loader from "../components/Loader";
import Slideshow from "../components/NoticeSlideshow";

const Notice = () => {
  /**
   * null  -> still loading (KEEP loader)
   * []    -> loaded but no notices
   * [..]  -> loaded with data
   */
  const [notices, setNotices] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    API.get("/notices")
      .then((res) => {
        if (!mounted) return;

        if (Array.isArray(res.data)) {
          setNotices(res.data);
        } else {
          setNotices([]);
        }
      })
      .catch((err) => {
        console.error("Failed to load notices", err);

        // ❗ DO NOT end loading on error
        if (mounted) {
          setError("Server is waking up, please wait…");
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="notice-page">
      <div className="notice-box">

        {/* HEADER ALWAYS RENDERS */}
        <div className="notice-header">
          <div className="notice-channel-pic"></div>
          <h2 className="notice-channel-name">THAKUR GYM</h2>
        </div>

        {/* 🔥 DATA-DRIVEN LOADER */}
        {notices === null ? (
          <>
            <Loader />
            {error && (
              <p style={{ textAlign: "center", opacity: 0.7 }}>
                {error}
              </p>
            )}
          </>
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
