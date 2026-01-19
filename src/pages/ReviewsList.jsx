import React, { useEffect, useState, useRef } from "react";
import API from "../api/api";
import Loader from "../components/Loader";

const ReviewsList = () => {
  const [reviews, setReviews] = useState(null); // 🔑 null = loading
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    API.get("/reviews")
      .then((res) => {
        setReviews(res.data || []);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load reviews");
        setReviews([]); // prevent crash
      });
  }, []);

  // Auto-scroll carousel
  useEffect(() => {
    if (showAll || !listRef.current) return;

    const interval = setInterval(() => {
      listRef.current.scrollBy({
        left: 350,
        behavior: "smooth",
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [showAll]);

  return (
    <div className="reviews-page">
      <h2 className="reviews-title">THEY TRUSTED US</h2>

      {!reviews ? (
        <Loader text="Please wait a few seconds to load reviews…" />
      ) : error ? (
        <p style={{ color: "white" }}>{error}</p>
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
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="review-brand">Thakur Gym</div>

                  <div className="review-stars">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span key={i}>
                        {i <= review.rating ? "★" : "☆"}
                      </span>
                    ))}
                  </div>

                  <p className="review-desc">“{review.description}”</p>

                  <div className="review-user">
                    <img
                      src={review.image || "/default-user.png"}
                      alt={review.name}
                    />
                    <div>
                      <h4>{review.name}</h4>
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
