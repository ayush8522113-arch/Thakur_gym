import { useEffect, useState } from "react";
import API from "../api/api";
import Loader from "../components/Loader";
import Slideshow from "../components/NoticeSlideshow";

const Notice = () => {
  // 🔑 KEY: null means "still loading"
  const [notices, setNotices] = useState(null);

  useEffect(() => {
    let isMounted = true; // safety

    API.get("/notices")
      .then((res) => {
        if (!isMounted) return;
        setNotices(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to load notices", err);
        if (isMounted) setNotices([]); // still end loading safely
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="notice-page">
      <div className="notice-box">

        {/* HEADER ALWAYS VISIBLE */}
        <div className="notice-header">
          <div className="notice-channel-pic"></div>
          <h2 className="notice-channel-name">THAKUR GYM</h2>
        </div>

        {/* 🔥 THIS IS THE FIX */}
        {notices === null ? (
          // 👇 Loader stays UNTIL notices is NOT null
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
