// remove useEffect completely


const NoticeSlideshow = ({ mediaUrl, mediaType }) => {
  // No media uploaded
  if (!mediaUrl) {
    return (
      <div className="notice-slideshow">
        <p style={{ textAlign: "center", padding: "20px" }}>
          No media uploaded
        </p>
      </div>
    );
  }

  return (
    <div className="notice-slideshow">
      {mediaType === "video" ? (
        <video
          src={mediaUrl}
          className="notice-slide-video"
          autoPlay
          muted
          loop
          playsInline
          controls
        />
      ) : (
        <img
          src={mediaUrl}
          alt="Notice"
          className="notice-slide-image"
        />
      )}
    </div>
  );
};

export default NoticeSlideshow;
