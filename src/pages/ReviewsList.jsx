import React, { useEffect, useState, useRef } from "react";
import API from "../api/api";
import Loader from "../components/Loader";

const ReviewsList = () => {
  /**
   * null  -> loading (show ONLY loader)
   * []    -> loaded but empty
   * [..]  -> loaded with reviews
   */
  const [reviews, setReviews] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const listRef = useRef(null);

  // ===============================
  // Fetch reviews (MUST be first)
  // ===============================
  useEffect(() => {
    let mounted = true;

    const fetchReviews = async () => {
      try {
        const res = await API.get("/reviews");
        if (!mounted) return;

        setReviews(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        // ❗ keep loader visible if backend is cold
        console.error("Reviews backend not ready yet...");
      }
    };

    fetchReviews();

    return () => {
      mounted = false;
    };
  }, []);

  // ===============================
  // Auto-scroll carousel (ALWAYS declared)
  // ===============================
  useEffect(() => {
    // Guard INSIDE effect, not outside
    if (reviews === null || showAll || !listRef.current) return;

    const interval = setInterval(() => {
      listRef.current.scrollBy({
        left: 350,
        behavior: "smooth",
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [reviews, showAll]);

  // ===============================
  // 🔥 EARLY RETURN AFTER HOOKS
  // ===============================
  if (reviews === null) {
    return <Loader />;
  }

  if (reviews.length === 0) {
    return (
      <div className="reviews-page">
        <h2 className="reviews-title">THEY TRUSTED US</h2>
        <p style={{ textAlign: "center" }}>No reviews available</p>
      </div>
    );
  }

  // ===============================
  // NORMAL RENDER
  // ===============================
  return (
    <div className="reviews-page">
      <h2 className="reviews-title">THEY TRUSTED US</h2>

      <div
        className={`reviews-container ${
          showAll ? "reviews-grid" : "reviews-carousel"
        }`}
        ref={!showAll ? listRef : null}
      >
        {reviews
          .filter(Boolean)
          .slice(0, showAll ? reviews.length : 3)
          .map((review, index) => (
            <div
              key={review._id}
              className={`review-card ${
                index === 1 && !showAll ? "featured" : ""
              }`}
            >
              <div className="review-brand">Thakur Gym</div>

              <div className="review-stars">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i}>
                    {i <= review.rating ? "★" : "☆"}
                  </span>
                ))}
              </div>

              <p className="review-desc">
                “{review.description || "Great experience!"}”
              </p>

              <div className="review-user">
                <img
                  src={review.image || "/default-user.png"}
                  alt={review.name || "User"}
                />
                <div>
                  <h4>{review.name || "Anonymous"}</h4>
                  <span>{review.about || "Gym Member"}</span>
                </div>
              </div>
            </div>
          ))}
      </div>

      {!showAll && reviews.length > 3 && (
        <button
          className="more-reviews-btn"
          onClick={() => setShowAll(true)}
        >
          More Reviews
        </button>
      )}
    </div>
  );
};

export default ReviewsList;
