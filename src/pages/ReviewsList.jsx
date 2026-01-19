import React, { useEffect, useState, useRef } from "react";
import API from "../api/api";
import Loader from "../components/Loader";

const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ useRef INSIDE component (only once)
  const listRef = useRef(null);

  // Fetch reviews
useEffect(() => {
  const fetchReviews = async () => {
    try {
      // Wake backend (Render cold start fix)
      await API.get("/health");

      const response = await API.get("/reviews");
      setReviews(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  fetchReviews();
}, []);


  // ✅ Auto-scroll ONLY when showing top 3 (carousel mode)
  useEffect(() => {
    if (showAll) return;

    const interval = setInterval(() => {
      if (listRef.current) {
        listRef.current.scrollBy({
          left: 350,
          behavior: "smooth",
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [showAll]);

  // Show only 3 initially
  const visibleReviews = showAll ? reviews : reviews.slice(0, 3);

 if (loading) {
    return <Loader text="Loading reviews, please wait…" />;
  }

  return (

    <div className="reviews-page" >
      <h2 className="reviews-title">THEY TRUSTED US</h2>

      {error && <p style={{ color: "white" }}>{error}</p>}

      {/* 🔥 Layout switches based on showAll */}
      <div 
        className={`reviews-container ${
          showAll ? "reviews-grid" : "reviews-carousel"
        }`}
        ref={!showAll ? listRef : null}
      >
        {visibleReviews.map((review, index) => (
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
                <span key={i}>{i <= review.rating ? "★" : "☆"}</span>
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

      {/* Button */}
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
