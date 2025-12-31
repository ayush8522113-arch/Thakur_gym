import { useState } from "react";
import { FaInstagram, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import API from "../api/api";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/contacts", {
      name,
      email,
      message,
    });

    alert("Message sent successfully");

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="contact-page">
      <h1 className="page-title">Contact Us</h1>
      <p className="page-subtitle">
        Have questions or want to join? Get in touch with us.
      </p>

      <div className="contact-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <textarea
            placeholder="Your Message"
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <button type="submit" className="contact-btn">
            Send Message
          </button>
        </form>

        <div className="contact-info">
          <h3>Gym Address</h3>
          <p>Thakur Gym, near matka chowk, Chhoti-line, Jagadhri, Yamunanagar, Haryana</p>

          <h3>Phone</h3>
          <p>+91 9896156433</p>

          <h3>Email</h3>
          <p>deepakthakur56433@gmail.com</p>
          <div className="contact-icons">
        {/* Instagram */}
        <a
          href="https://www.instagram.com/YOUR_USERNAME/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="icon instagram"
        >
          <FaInstagram />
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/9896156433?text=Hello%20Coach%0AI’m%20interested%20in%20gym%20training%20and%20would%20like%20more%20details.%0APlease%20let%20me%20know%20the%20next%20steps.%20💪"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="icon whatsapp"
        >
          <FaWhatsapp />
        </a>

        {/* Google Maps */}
        <a
          href="https://maps.app.goo.gl/mcGvRmiRUpszuRWS9"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Location"
          className="icon maps"
        >
          <FaMapMarkerAlt />
        </a>
      </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
