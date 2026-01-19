import { useEffect, useState } from "react";
import API from "../api/api";
import Loader from "../components/Loader";
import Slideshow from "../components/NoticeSlideshow";

const Notice = () => {
  // 🔑 null = not loaded yet
  const [notices, setNotices] = useState(null);

  useEffect(() => {
    API.get("/notices")
      .then((res) => {
        setNotices(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to load notices", err);
        setNotices([]); // prevent crash
      });
  }, []);

  return (
    <div className="notice-page">
      <div className="notice-box">

        {/* HEADER (always visible) */}
        <div className="notice-header">
          <div className="notice-channel-pic"></div>
          <h2 className="notice-channel-name">THAKUR GYM</h2>
        </div>

        {/* DATA SECTION */}
        {!notices ? (
          <Loader text="Please wait a few seconds to load notices…" />
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
