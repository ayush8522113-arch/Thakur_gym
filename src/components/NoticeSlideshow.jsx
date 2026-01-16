import { useEffect, useState } from "react";

const NoticeSlideshow = ({ media = [] }) => {
  const [current, setCurrent] = useState(0);

  // Auto-slide
  useEffect(() => {
    if (!media || media.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % media.length);
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, [media]);

  // No media
  if (!media || media.length === 0) {
    return (
      <div className="notice-slideshow">
        <p style={{ textAlign: "center", padding: "20px" }}>
          No media uploaded
        </p>
      </div>
    );
  }

  const currentMedia = media[current];

  return (
    <div className="notice-slideshow">
      {currentMedia.type === "video" ? (
        <video
          src={currentMedia.url}
          className="notice-slide-video"
          autoPlay
          muted
          loop
          playsInline
          controls
        />
      ) : (
        <img
          src={currentMedia.url}
          alt={`Notice ${current + 1}`}
          className="notice-slide-image"
        />
      )}
    </div>
  );
};

export default NoticeSlideshow;
