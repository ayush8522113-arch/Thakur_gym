import React, { useEffect, useState } from "react";
import API from "../../api/api";

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    const res = await API.get("/reviews/admin");
    setReviews(res.data);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const deleteReview = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/reviews/${id}`);
      fetchReviews(); // refresh list
    } catch (err) {
      alert("Failed to delete review");
    }
  };

  return (
    <div className="admin-reviews-page">
  <h2 className="admin-reviews-title">Manage Reviews</h2>

  {reviews.length === 0 ? (
    <div className="admin-empty">No reviews found</div>
  ) : (
    <div className="admin-table-wrapper">
      <table className="admin-reviews-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Review</th>
            <th>Rating</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>

{/* DESKTOP TABLE */}
<tbody className="admin-desktop-only">
  {reviews.map((review) => (
    <tr key={review._id}>
      <td><strong>{review.name}</strong></td>
      <td>{review.description}</td>
      <td>
        <div className="admin-stars">
          {"★".repeat(review.rating)}
        </div>
      </td>
      <td>
        {review.image && (
          <img
            src={review.image}
            alt={review.name}
            className="admin-review-img"
          />
        )}
      </td>
      <td>
        <button
          className="admin-btn delete"
          onClick={() => deleteReview(review._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

      </table>

{/* MOBILE CARDS */}
<div className="admin-mobile-only admin-review-cards">
  {reviews.map((review) => (
    <div key={review._id} className="admin-review-card">
      <div className="card-header">
        <strong>{review.name}</strong>
        <span className="card-stars">
          {"★".repeat(review.rating)}
        </span>
      </div>

      <p className="card-text">{review.description}</p>

      <div className="card-footer">
        {review.image && (
          <img
            src={review.image}
            alt={review.name}
            className="admin-review-img"
          />
        )}

        <button
          className="admin-btn delete"
          onClick={() => deleteReview(review._id)}
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>


    </div>
  )}
</div>
  );
};

export default AdminReviews;
