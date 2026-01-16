import Slideshow from "../components/NoticeSlideshow";
import API from "../api/api";
import { useEffect, useState } from "react";

const Notice = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      const res = await API.get("/notices");
      setNotices(res.data);
    };
    fetchNotices();
  }, []);

  const latestNotice = notices[0];

  if (!latestNotice) return null;

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

        {/* MEDIA */}
        <div className="notice-slider">
          <Slideshow
            mediaUrl={latestNotice.mediaUrl}
            mediaType={latestNotice.mediaType}
          />
        </div>

      </div>
    </div>
  );
};

export default Notice;
