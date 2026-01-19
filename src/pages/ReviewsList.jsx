import React, { useEffect, useState, useRef } from "react";
import API from "../api/api";
import Loader from "../components/Loader";

const ReviewsList = () => {
  /**
   * null  -> still loading (KEEP loader)
   * []    -> loaded but no reviews
   * [..]  -> loaded with reviews
   */
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const listRef = useRef(null);

  // ===============================
  // Fetch reviews (DATA-DRIVEN)
  // ===============================
  useEffect(() => {
    let mounted = true;

    API.get("/reviews")
      .then((res) => {
        if (!mounted) return;

        if (Array.isArray(res.data)) {
          setReviews(res.data);
        } else {
          setReviews([]);
        }
      })
      .catch((err) => {
        console.error("Failed to load reviews", err);

        // ❗ DO NOT end loading here
        if (mounted) {
          setError("Server is waking up, please wait…");
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  // ===============================
  // Auto-scroll carousel
  // ===============================
  useEffect(() => {
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
  // RENDER
  // ===============================
  return (
    <div className="reviews-page">
      <h2 className="reviews-title">THEY TRUSTED US</h2>

      {/* 🔥 DATA-DRIVEN LOADER */}
      {reviews === null ? (
        <>
          <Loader />
          {error && (
            <p style={{ textAlign: "center", opacity: 0.7 }}>
              {error}
            </p>
          )}
        </>
      ) : reviews.length === 0 ? (
        <p style={{ textAlign: "center" }}>No reviews available</p>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default ReviewsList;
