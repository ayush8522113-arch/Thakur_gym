import { useState, useEffect } from "react";

const NoticeSlideshow = ({ media = [] }) => {
  const [current, setCurrent] = useState(0);
  const baseURL =`${process.env.REACT_APP_API_URL}`;

  // Auto slide
  useEffect(() => {
    if (!media.length) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % media.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [media.length]);

  // No media
  if (!media.length) {
    return (
      <div className="notice-slideshow">
        <p style={{ textAlign: "center", padding: "20px" }}>
          No media uploaded
        </p>
      </div>
    );
  }

  const currentMedia = media[current];
  const fullUrl = `${process.env.REACT_APP_API_URL}/${currentMedia.url}`;

  return (
    <div className="notice-slideshow">
      {currentMedia.type === "video" ? (
        <video
          url={fullUrl}
          src={`${baseURL}${currentMedia.url}`}
          className="notice-slide-video"
          autoPlay
          muted
          loop
          playsInline
          controls
        />
      ) : (
        <img
          src={`${baseURL}${currentMedia.url}`}
          url={fullUrl}
          alt="Notice"
          className="notice-slide-image"
        />
      )}
    </div>
  );
};

export default NoticeSlideshow;
