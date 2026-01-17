import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const AddReview = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !rating || !description) {
      setError("Name, rating and description are required");
      return;
    }

    // ✅ DEFINE formData
    const formData = new FormData();
    formData.append("name", name);
    formData.append("rating", rating);
    formData.append("description", description);
    formData.append("about", about);
    if (image) formData.append("image", image);

    try {
      await API.post("/reviews", formData);
      navigate("/reviews");
    } catch (err) {
      console.error(err);
      setError("Failed to submit review");
    }
  };

  return (
    <div className="add-review-page">
      <h2>Add Review</h2>

      <form onSubmit={handleSubmit}>
       <table className="review-table">
          <tbody>
            <tr>
              <td>Name *</td>
              <td>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td>Rating *</td>
              <td>
                {[1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    onClick={() => setRating(i)}
                    style={{
                      cursor: "pointer",
                      fontSize: "22px",
                      color: i <= rating ? "gold" : "#ccc",
                    }}
                  >
                    ★
                  </span>
                ))}
              </td>
            </tr>

            <tr>
              <td>Description *</td>
              <td>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td>About</td>
              <td>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td>Photo</td>
              <td>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </td>
            </tr>

            <tr>
              <td colSpan="2">
                <button type="submit">Submit Review</button>
              </td>
            </tr>
          </tbody>
        </table>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default AddReview;
