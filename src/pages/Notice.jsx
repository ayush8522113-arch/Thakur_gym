import { useEffect, useState } from "react";
import API from "../api/api";
import Skeleton from "../components/Skeleton";
import Slideshow from "../components/NoticeSlideshow";

const Notice = () => {
  const [notices, setNotices] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchNotices = async () => {
      try {
        const res = await API.get("/notices");
        if (mounted) {
          setNotices(Array.isArray(res.data) ? res.data : []);
        }
      } catch {
        // ❗ Do nothing – skeleton stays
      }
    };

    fetchNotices();

    return () => {
      mounted = false;
    };
  }, []);

  const latestNotice = notices?.[0];

  return (
    <div className="notice-page">
      <div className="notice-box">

        {/* HEADER (always visible) */}
        <div className="notice-header">
          <div className="notice-channel-pic"></div>
          <h2 className="notice-channel-name">THAKUR GYM</h2>
          <h5>
            Posted on:{" "}
            {latestNotice?.createdAt ? (
              new Date(latestNotice.createdAt).toLocaleString()
            ) : (
              <Skeleton width="40%" height={14} />
            )}
          </h5>
        </div>

        {/* BODY */}
        {!notices ? (
          <>
            <Skeleton height={24} />
            <Skeleton height={24} />
            <Skeleton height={24} />
            <Skeleton height={200} />
          </>
        ) : notices.length === 0 ? (
          <p style={{ textAlign: "center" }}>No notices available</p>
        ) : (
          <>
            <div className="notice-title">
              <h3>{latestNotice.title}</h3>
              <p>{latestNotice.description}</p>
            </div>

            <div className="notice-slider">
              <Slideshow media={latestNotice.media || []} />
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default Notice;
