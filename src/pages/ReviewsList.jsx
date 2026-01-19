import React, { useEffect, useState, useRef } from "react";
import API from "../api/api";
import Loader from "../components/Loader";

const RETRY_DELAY = 3000;

const ReviewsList = () => {
  const [reviews, setReviews] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    let retryTimeout;

    const fetchReviews = async () => {
      try {
        const res = await API.get("/reviews");

        if (!mounted) return;

        // ✅ SUCCESS
        setReviews(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        // ❗ FAILURE → RETRY, KEEP LOADER
        if (!mounted) return;

        retryTimeout = setTimeout(fetchReviews, RETRY_DELAY);
      }
    };

    fetchReviews();

    return () => {
      mounted = false;
      clearTimeout(retryTimeout);
    };
  }, []);

  useEffect(() => {
    if (reviews === null || showAll || !listRef.current) return;

    const interval = setInterval(() => {
      listRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }, 3000);

    return () => clearInterval(interval);
  }, [reviews, showAll]);

  return (
    <div className="reviews-page">
      <h2 className="reviews-title">THEY TRUSTED US</h2>

      {/* 🔥 LOADER UNTIL BACKEND RESPONDS */}
      {reviews === null ? (
        <Loader />
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
