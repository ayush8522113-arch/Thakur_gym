
import { useState } from "react";
import API from "../api/api";

const Booking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    trainingType: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/bookings", formData);

      alert("Booking successful!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        trainingType: "",
        date: "",
        time: "",
      });
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Please login before booking"
      );
    }
  };

  return (
    <div className="booking-container">
      <div className="booking-box">
        <h2>Book a Training Session</h2>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          {/* Training Type */}
          <select
            name="trainingType"
            value={formData.trainingType}
            onChange={handleChange}
            required
          >
            <option value="">Select Training Type</option>
            <option value="Weight Loss">Weight Loss</option>
            <option value="Muscle Gain">Muscle Gain</option>
            <option value="Personal Training">Personal Training</option>
          </select>

          {/* Date */}
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          {/* Time */}
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />

          <button type="submit" className="booking-btn">
            Book Session
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
